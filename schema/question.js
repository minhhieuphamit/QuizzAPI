const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  questionText: String,
  answerA: String,
  answerB: String,
  answerC: String,
  answerD: String,
  correctAnswer: String,
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  },
  difficultyLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "difficulty_levels",
  },
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
