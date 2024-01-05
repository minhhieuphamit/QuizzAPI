const { body } = require("express-validator");
const message = require("../helper/message");

module.exports = {
  validator: function () {
    return [body("difficultyName", "Độ khó không được để trống").notEmpty()];
  },
};
