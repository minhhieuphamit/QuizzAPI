const mongoose = require("mongoose");
const difficultyLevelSchema = new mongoose.Schema({
  difficultyName: String,
});

const difficultyLevel = mongoose.model(
  "difficulty_level",
  difficultyLevelSchema
);

module.exports = difficultyLevel;
