var SchemaQuizzAttempt = require("../schema/quizzAttempt");

module.exports = {
  createQuizAttempt: function (quizAttempt) {
    return new SchemaQuizAttempt(quizAttempt).save();
  },
};
