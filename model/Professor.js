const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastAllottedIndex: {
    type: Number,
    default: -1,
  },
  seniority: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Professor', professorSchema);
