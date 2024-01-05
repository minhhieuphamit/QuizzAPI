const modelQuizAttempt = require("../models/quizzAttempt");

const saveQuizAttempt = async (req, res, next) => {
  try {
    const quizAttempt = await modelQuizAttempt.createQuizAttempt(req.body);
    responseData.responseReturn(res, 200, "Success", quizAttempt);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  saveQuizAttempt,
};
