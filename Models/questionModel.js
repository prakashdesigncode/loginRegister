const { Schema, default: mongoose } = require("mongoose");

const question = new Schema({
  question: { type: String, require: true },
  options: { type: Array, require: true },
  answer: { type: Number },
  userAnswer: { type: Number },
});

module.exports = mongoose.model("question", question);
