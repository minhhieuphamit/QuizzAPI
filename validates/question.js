const { body } = require("express-validator");
const message = require("../helper/message");

module.exports = {
  validator: function () {
    return [
      body("questionText", "Câu hỏi không được để trống").notEmpty(),
      body("answerA", "Câu trả lời A không được để trống").notEmpty(),
      body("answerB", "Câu trả lời B không được để trống").notEmpty(),
      body("answerC", "Câu trả lời C không được để trống").notEmpty(),
      body("answerD", "Câu trả lời D không được để trống").notEmpty(),
      body("correctAnswer", "Câu trả lời đúng không được để trống").notEmpty(),
      body("subject", "Chủ đề không được để trống").notEmpty(),
      body("difficultyLevel", "Mức độ khó không được để trống").notEmpty(),
    ];
  },
};
