var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../helper/configs");
const schema = new mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  role: String,
  avatar_url: String,
});

schema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

schema.methods.getJWT = function () {
  var token = jwt.sign({ id: this._id }, configs.SECRET_KEY, {
    expiresIn: configs.EXP,
  });
  return token;
};

schema.statics.checkLogin = async function (username, password) {
  if (!username || !password) {
    return { err: "Hay nhap day du username va password" };
  }
  var user = await this.findOne({ username: username });
  if (!user) {
    return { err: "username khong ton tai" };
  }
  var result = bcrypt.compareSync(password, user.password);
  if (!result) {
    return { err: "password sai" };
  }
  return user;
};

module.exports = mongoose.model("user", schema);
