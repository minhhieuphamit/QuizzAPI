const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  quizz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quizz",
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
      answer: String,
    },
  ],
  score: Number,
});

const QuizAttempt = mongoose.model("quizAttempt", quizAttemptSchema);

module.exports = QuizAttempt;
