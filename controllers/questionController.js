const responseData = require("../helper/responseData");
const { validationResult } = require("express-validator");
const modelQuestion = require("../models/question");
const modelDifficultyLevel = require("../models/difficultyLevel");
const modelSubject = require("../models/subject");

const getAll = async (req, res, next) => {
  try {
    const questions = await modelQuestion.getAll(req.query);
    responseData.responseReturn(res, 200, "Success", questions);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const findById = async (req, res, next) => {
  try {
    const question = await modelQuestion.getOne(req.params.id);
    if (!question) {
      responseData.responseReturn(res, 404, false, "Question not found");
      return;
    }
    responseData.responseReturn(res, 200, "Success", question);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(
        res,
        400,
        false,
        errors.array().map((error) => error.msg)
      );
      return;
    }

    const subject = await modelSubject.getOne(req.body.subject);
    const difficultyLevel = await modelDifficultyLevel.getOne(
      req.body.difficultyLevel
    );

    if (!subject && !difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Subject and difficulty level not found"
      );
      return;
    }

    if (!subject) {
      responseData.responseReturn(res, 404, false, "Subject not found");
      return;
    }

    if (!difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Difficulty level not found"
      );
      return;
    }

    const question = await modelQuestion.getByQuestionText(
      req.body.questionText
    );

    if (question) {
      responseData.responseReturn(res, 404, false, "Question already exists");
    } else {
      const newQuestion = await modelQuestion.createQuestion({
        questionText: req.body.questionText,
        answerA: req.body.answerA,
        answerB: req.body.answerB,
        answerC: req.body.answerC,
        answerD: req.body.answerD,
        correctAnswer: req.body.correctAnswer,
        subject: req.body.subject,
        difficultyLevel: req.body.difficultyLevel,
      });
      responseData.responseReturn(res, 200, "Success", newQuestion);
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(
        res,
        400,
        false,
        errors.array().map((error) => error.msg)
      );
      return;
    }

    const subject = await modelSubject.getOne(req.body.subject);
    const difficultyLevel = await modelDifficultyLevel.getOne(
      req.body.difficultyLevel
    );

    if (!subject && !difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Subject and difficulty level not found"
      );
      return;
    }

    if (!subject) {
      responseData.responseReturn(res, 404, false, "Subject not found");
      return;
    }

    if (!difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Difficulty level not found"
      );
      return;
    }

    const question = await modelQuestion.getOne(req.params.id);
    if (!question) {
      responseData.responseReturn(res, 404, false, "Question not found");
    } else {
      const updatedQuestion = await modelQuestion.updateQuestion(
        req.params.id,
        {
          questionText: req.body.questionText,
          answerA: req.body.answerA,
          answerB: req.body.answerB,
          answerC: req.body.answerC,
          answerD: req.body.answerD,
          correctAnswer: req.body.correctAnswer,
          subject: req.body.subject,
          difficultyLevel: req.body.difficultyLevel,
        }
      );
      responseData.responseReturn(res, 200, "Success", updatedQuestion);
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const question = await modelQuestion.getOne(req.params.id);
    if (!question) {
      responseData.responseReturn(res, 404, false, "Question not found");
    } else {
      await modelQuestion.deleteQuestion(req.params.id);
      responseData.responseReturn(res, 200, "Success", question);
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  getAll,
  findById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
