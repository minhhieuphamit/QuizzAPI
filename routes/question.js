const express = require("express");
const router = express.Router();
const QuestionValidate = require("../validates/question");
const questionController = require("../controllers/questionController");

router.get("/", questionController.getAll);

router.get("/:id", questionController.findById);

router.post(
  "/",
  QuestionValidate.validator(),
  questionController.createQuestion
);

router.put("/:id", questionController.updateQuestion);

router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
