const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  experience: {
    type: Number,
    required: true,
    min: 1,
  },
  questions: {
    type: [String],
    required: true,
    validate: {
      validator: (questions) => questions.length > 0,
      message: "Please add at least one question for the interview.",
    },
  },
},
{ timestamps: true }
);

module.exports = mongoose.model('interview', interviewSchema);
