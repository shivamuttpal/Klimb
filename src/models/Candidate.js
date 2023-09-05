const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String,
});

module.exports = mongoose.model('Candidate', candidateSchema);
