const responseData = require("../helper/responseData");
const modelQuestion = require("../models/question");
const modelQuizz = require("../models/quizz");

const createQuizz = async (req, res, next) => {
  try {
    const subjectId = req.body.subjectId;
    const easyQuestions = await modelQuestion.getRandomQuestions(
      subjectId,
      "6596154ab1f69b2bf8e4b3fe",
      5
    );
    const mediumQuestions = await modelQuestion.getRandomQuestions(
      subjectId,
      "65961546b1f69b2bf8e4b3fb",
      3
    );
    const hardQuestions = await modelQuestion.getRandomQuestions(
      subjectId,
      "6596154eb1f69b2bf8e4b401",
      2
    );

    if (
      easyQuestions.length < 5 ||
      mediumQuestions.length < 3 ||
      hardQuestions.length < 2
    ) {
      return responseData.responseReturn(
        res,
        400,
        true,
        "Not enough questions in the database"
      );
    }

    const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    console.log(questions);
    //in ra id cua tung question
    questions.forEach((question) => {
      console.log(question._id);
    });
    const quizz = await modelQuizz.createQuizz(questions);
    responseData.responseReturn(res, 200, "Success", quizz);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  createQuizz,
};
