var SchemaSubject = require("../schema/subject");

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
    return SchemaSubject.find(Search)
      .select("subjectName")
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();
  },
  getByName: function (subjectName) {
    return SchemaSubject.findOne({
      subjectName: subjectName,
    }).exec();
  },
  getOne: function (id) {
    return SchemaSubject.findById(id);
  },
  getByName: function (subjectName) {
    return SchemaSubject.findOne({
      subjectName: subjectName,
    }).exec();
  },
  createSubject: function (subjectName) {
    return new SchemaSubject(subjectName).save();
  },
  updateSubject: function (id, subjectName) {
    return SchemaSubject.findByIdAndUpdate(id, subjectName, {
      new: true,
    });
  },
  deleteSubject: function (id) {
    return SchemaSubject.findByIdAndDelete(id);
  },
};
