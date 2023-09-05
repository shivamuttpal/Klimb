const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const Candidate = require('./models/Candidate');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage }); 

// Define routes for handling file uploads and candidate creation
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file)
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    for (const item of data) {
      await Candidate.create(item);
    }

    res.status(201).json({ message: 'Candidates added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading candidates' });
  }
});
 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
