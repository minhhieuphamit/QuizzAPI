const mongoose = require("mongoose");

const quizzSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "question",
    },
  ],
});

const Quizz = mongoose.model("quizz", quizzSchema);

module.exports = Quizz;
