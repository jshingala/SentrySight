from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import cv2
import logging
import boto3
from ultralytics import YOLO
import time
from collections import defaultdict
from datetime import datetime, timedelta

S3_BUCKET_NAME = "logbucketsentry"
S3_LOGS_FOLDER = "ai_logs/"
AWS_ACCESS_KEY = "access key here"
AWS_SECRET_KEY = "secret key here"

#configure logging before creating S3 client
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()  # Always log to console
    ]
)

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
LOGS_FOLDER = "/home/ubuntu/logs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)
os.makedirs(LOGS_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

logging.info("Loading YOLOv8 model...")
model = YOLO("yolov8n.pt")
logging.info("YOLOv8 model loaded successfully.")

# Rate limiting implementation - track requests per IP per minute
rate_limit_data = defaultdict(list)
RATE_LIMIT = 5  # Maximum 5 requests per minute

def clean_old_rate_limit_data():
    """Remove entries older than 1 minute from the rate limiting data"""
    current_time = datetime.now()
    one_minute_ago = current_time - timedelta(minutes=1)
    
    for ip, timestamps in list(rate_limit_data.items()):
        rate_limit_data[ip] = [ts for ts in timestamps if ts > one_minute_ago]
        
        # Remove empty entries
        if not rate_limit_data[ip]:
            del rate_limit_data[ip]

def check_rate_limit(ip_address):
    """Check if an IP has exceeded the rate limit
    Returns: (bool) True if rate limit exceeded, False otherwise
    """
    clean_old_rate_limit_data()
    
    # Get the current timestamps for this IP
    timestamps = rate_limit_data[ip_address]
    
    # If there are 5 or more timestamps and they're all within the last minute, 
    # the rate limit is exceeded
    if len(timestamps) >= RATE_LIMIT:
        return True
    
    # Add the current timestamp
    rate_limit_data[ip_address].append(datetime.now())
    return False

@app.route('/upload', methods=['POST'])
def upload_file():
    user_ip = request.remote_addr
    user_ip_log = user_ip.replace(".", "_")  # For log filename
    log_file_path = os.path.join(LOGS_FOLDER, f"log_{user_ip_log}.log")

    # Create a file handler specifically for this request
    file_handler = logging.FileHandler(log_file_path, mode="a")
    file_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
    
    # Get the root logger and add the file handler
    root_logger = logging.getLogger()
    root_logger.addHandler(file_handler)

    try:
        logging.info(f"Received request from {user_ip}")
        
        if check_rate_limit(user_ip): # Check rate limit
            logging.warning(f"IP {user_ip} has exceeded rate limit (5 requests per minute)")
            return jsonify({
                "error": "Rate limit exceeded", 
                "message": "You can only make 5 requests per minute"
            }), 429

        if 'image' not in request.files:
            logging.warning(f"IP {user_ip} attempted upload without a file.")
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['image']
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        processed_path = os.path.join(app.config['PROCESSED_FOLDER'], f"inference_{file.filename}")

        logging.info(f"Saving uploaded file: {file.filename} from IP: {user_ip}")
        file.save(file_path)

        try:
            logging.info(f"Running YOLOv8 inference on {file.filename}...")
            results = model.predict(file_path, imgsz=224, verbose=True)

            if not results:
                raise ValueError("YOLOv8 returned no results!")

            for result in results:
                inference_time = result.speed["inference"]
                preprocess_time = result.speed["preprocess"]
                postprocess_time = result.speed["postprocess"]

                logging.info(f"Inference results for {file.filename}:")
                logging.info(f"Preprocessing: {preprocess_time:.2f} ms")
                logging.info(f"Inference: {inference_time:.2f} ms")
                logging.info(f"Postprocessing: {postprocess_time:.2f} ms")

                annotated_img = result.plot()

            logging.info(f"Saving inference image: inference_{file.filename}")
            cv2.imwrite(processed_path, annotated_img)

            upload_logs_to_s3(log_file_path, user_ip_log)

            return jsonify({
                "imageUrl": f"http://{request.host}/processed/inference_{file.filename}",
                "user_ip": user_ip,
                "timing": {
                    "preprocess": preprocess_time,
                    "inference": inference_time,
                    "postprocess": postprocess_time
                },
                "usage": {
                    "current": len(rate_limit_data[user_ip]),
                    "limit": RATE_LIMIT,
                    "reset": "1 minute from your first request"
                }
            })

        except Exception as e:
            logging.error(f"Error processing image {file.filename}: {str(e)}")
            return jsonify({"error": "Failed to process image", "details": str(e)}), 500

    finally:
        # Remove the file handler to prevent duplicate logging
        root_logger.removeHandler(file_handler)
        file_handler.close()

@app.route('/processed/<filename>')
def processed_file(filename):
    logging.info(f"Serving processed image: {filename}")
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

def upload_logs_to_s3(log_file_path, user_ip):
    try:
        if not os.path.exists(log_file_path):
            logging.error("Log file does not exist.")
            return

        with open(log_file_path, "r") as f:
            log_content = f.read()

        if not log_content.strip():
            logging.warning("Log file is empty.")
            return

        timestamp = time.strftime("%Y%m%d-%H%M%S")
        log_filename = f"{S3_LOGS_FOLDER}log_{user_ip}_{timestamp}.txt"

        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=log_filename,
            Body=log_content,
            ContentType="text/plain"
        )

        logging.info(f"Logs uploaded to S3: {S3_BUCKET_NAME}/{log_filename}")

    except Exception as e:
        logging.error(f"Failed to upload logs to S3: {str(e)}")

if __name__ == '__main__':
    logging.info("Starting Flask server on port 3000...")
    app.run(host='0.0.0.0', port=3000, debug=True)