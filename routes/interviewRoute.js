const express = require("express");
const multer = require('multer');
const { addInterview, fetchInterviews, singleInterviewData, submitInterviewData } = require('../controllers/interviewController.js');

const interviewRouter = express.Router();

const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure Multer to handle any file fields
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Set file size limit to 50MB
  fileFilter: (req, file, cb) => {
    // Accept files only with field names starting with 'video_'
    if (file.fieldname.startsWith('video_')) {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
  }
}).any(); // Accept any files

// Define the routes
interviewRouter.post('/add', addInterview);
interviewRouter.get('/interview-list', fetchInterviews);
interviewRouter.get('/interview-list/:id', singleInterviewData);

// Use the `upload` middleware for the `/submit` route
interviewRouter.post('/submit', upload, (req, res, next) => {
  // Handle any multer errors
  if (req.fileValidationError) {
    return res.status(400).json({ success: false, message: req.fileValidationError });
  }
  if (!req.files) {
    return res.status(400).json({ success: false, message: "No files were uploaded." });
  }
  next(); // Pass control to the next handler
}, submitInterviewData);

module.exports = interviewRouter;
