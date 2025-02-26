from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import os
import cv2
import logging
from ultralytics import YOLO

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

app = Flask(__name__)
CORS(app)  

# make sure upload folders exist
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  

logging.info("loading yolo model...")
model = YOLO("yolov8n.pt")  
logging.info("yolo model loaded.")

@app.route('/upload', methods=['POST'])
def upload_file():
    logging.info("got a request to /upload")

    if 'image' not in request.files:
        logging.warning("no file found in request")
        return jsonify({"error": "no file uploaded"}), 400
    
    file = request.files['image']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    processed_path = os.path.join(app.config['PROCESSED_FOLDER'], f"inference_{file.filename}")

    logging.info(f"saving file: {file.filename}")
    file.save(file_path)

    try:
        logging.info(f"running yolo inference on {file.filename} (size=224)")
        results = model.predict(file_path, imgsz=224, verbose=True)

        if not results:
            raise ValueError("yolo returned no results")

        for result in results:
            inference_time = result.speed["inference"]
            preprocess_time = result.speed["preprocess"]
            postprocess_time = result.speed["postprocess"]

            logging.info(f"timing for {file.filename} -> preprocess: {preprocess_time:.2f} ms, inference: {inference_time:.2f} ms, postprocess: {postprocess_time:.2f} ms")

            annotated_img = result.plot()

        logging.info(f"saving inference result: inference_{file.filename}")
        cv2.imwrite(processed_path, annotated_img)

        logging.info(f"done. returning image url: http://{request.host}/processed/inference_{file.filename}")

        return jsonify({
            "imageUrl": f"http://{request.host}/processed/inference_{file.filename}",
            "timing": {
                "preprocess": preprocess_time,
                "inference": inference_time,
                "postprocess": postprocess_time
            }
        })

    except Exception as e:
        logging.error(f"error processing {file.filename}: {str(e)}")
        return jsonify({"error": "failed to process image", "details": str(e)}), 500

@app.route('/processed/<filename>')
def processed_file(filename):
    logging.info(f"serving image: {filename}")
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

if __name__ == '__main__':
    logging.info("starting server on port 3000...")
    app.run(host='0.0.0.0', port=3000, debug=True)
