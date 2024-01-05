const { body } = require("express-validator");
const message = require("../helper/message");
const util = require("util");

var options = {
  username: {
    min: 6,
    max: 80,
  },
  roles: ["admin", "user", "teacher"],
};

module.exports = {
  validator: function () {
    return [
      body(
        "username",
        util.format(
          message.size_string_message,
          "username",
          options.username.min,
          options.username.max
        )
      ).isLength(options.username),
      body("email", "Email không đúng định dạng").isEmail(),
      body("password", "Mật khẩu không đủ mạnh").isStrongPassword(),
      body("role", "Role invalidate").isIn(options.roles),
      body("firstname", "Tên không được để trống").notEmpty(),
      body("lastname", "Họ không được để trống").notEmpty(),
    ];
  },
};
