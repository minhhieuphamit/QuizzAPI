const { body } = require("express-validator");
const message = require("../helper/message");

module.exports = {
  validator: function () {
    return [body("subjectName", "Môn học không được để trống").notEmpty()];
  },
};
