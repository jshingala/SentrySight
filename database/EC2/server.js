const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  
    }
});

const upload = multer({ storage });
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


// Make sure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve uploaded images
app.use('/uploads', express.static(uploadDir));

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ imageUrl: `http://3.133.147.122:3000/uploads/${req.file.filename}` });
});

app.listen(3000, '0.0.0.0', () => console.log("EC2 Server running on port 3000"));
