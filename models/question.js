var SchemaQuestion = require("../schema/question");

module.exports = {
  getAll: function (query) {
    var sort = {};
    var Search = {};
    if (query.sort) {
      if (query.sort[0] == "-") {
        sort[query.sort.substring(1)] = "desc";
      } else {
        sort[query.sort] = "asc";
      }
    }
    if (query.key) {
      Search.question = new RegExp(query.key, "i");
    }
    var limit = parseInt(query.limit) || 10;
    var page = parseInt(query.page) || 1;
    var skip = (page - 1) * limit;
    return SchemaQuestion.find(Search)
      .select(
        "questionText answerA answerB answerC answerD correctAnswer subject difficultyLevel"
      )
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
  getOne: function (id) {
    return SchemaQuestion.findById(id);
  },
  getByQuestionText: function (questionText) {
    return SchemaQuestion.findOne({
      questionText: questionText,
    }).exec();
  },
  getBySubject: function (subject) {
    return SchemaQuestion.find({
      subject: subject,
    }).exec();
  },
  getByDifficulty: function (difficulty) {
    return SchemaQuestion.find({
      difficulty: difficulty,
    }).exec();
  },
  createQuestion: function (question) {
    return new SchemaQuestion(question).save();
  },
  updateQuestion: function (id, question) {
    return SchemaQuestion.findByIdAndUpdate(id, question, {
      new: true,
    });
  },
  deleteQuestion: function (id) {
    return SchemaQuestion.findByIdAndDelete(id);
  },
  getRandomQuestions: function (subjectId, difficultyId, limit) {
    return SchemaQuestion.aggregate([
      {
        $match: {
          subject: subjectId,
          difficultyLevel: difficultyId,
        },
      },
      { $sample: { size: limit } },
    ])
      .exec()
      .then((questions) => {
        return questions;
      })
      .catch((error) => {
        console.error(`Error fetching questions: ${error}`);
        throw error;
      });
  },
};
