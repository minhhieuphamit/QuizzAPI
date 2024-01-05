var SchemaDifficultylevel = require("../schema/difficultyLevel");

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
      Search.name = new RegExp(query.key, "i");
    }
    var limit = parseInt(query.limit) || 10;
    var page = parseInt(query.page) || 1;
    var skip = (page - 1) * limit;
    return SchemaDifficultylevel.find(Search)
      .select("difficultyName")
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
  getByName: function (difficultyName) {
    return SchemaDifficultylevel.findOne({
      difficultyName: difficultyName,
    }).exec();
  },
  getOne: function (id) {
    return SchemaDifficultylevel.findById(id);
  },
  getByName: function (difficultyName) {
    return SchemaDifficultylevel.findOne({
      difficultyName: difficultyName,
    }).exec();
  },
  createDifficultyLevel: function (difficultyLevel) {
    return new SchemaDifficultylevel(difficultyLevel).save();
  },
  updateDifficultyLevel: function (id, difficultyLevel) {
    return SchemaDifficultylevel.findByIdAndUpdate(id, difficultyLevel, {
      new: true,
    });
  },
  deleteDifficultyLevel: function (id) {
    return SchemaDifficultylevel.findByIdAndDelete(id);
  },
};
