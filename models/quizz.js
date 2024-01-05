var SchemaQuizz = require("../schema/quizz");


module.exports = {
  createQuizz: function (questions) {
    const questionIds = questions.map((question) => question._id);
    return new SchemaQuizz({ questions: questionIds }).save().catch((error) => {
      console.error("Error saving quiz: ", error);
      throw error;
    });
  },
};
