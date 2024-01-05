const responseData = require("../helper/responseData");
const { validationResult } = require("express-validator");
const modelUser = require("../models/user");
const jwt = require("jsonwebtoken");
const { checkLogin, checkRole } = require("../middlewares/protect");

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(
        res,
        400,
        false,
        errors.array().map((error) => error.msg)
      );
      return;
    }

    const user = await modelUser.getByName(req.body.username);
    if (user) {
      responseData.responseReturn(res, 404, false, "User đã tồn tại");
    } else {
      const newUser = await modelUser.createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });
      responseData.responseReturn(res, 200, "Đăng ký thành công", newUser);
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const login = async (req, res, next) => {
  try {
    const result = await modelUser.login(req.body.username, req.body.password);
    if (result.err) {
      responseData.responseReturn(res, 400, true, result.err);
      return;
    }
    const token = result.getJWT();
    res.cookie("tokenJWT", token);
    responseData.responseReturn(res, 200, "Đăng nhập thành công", token);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const profile = async function (req, res, next) {
  try {
    // Check login
    const loginResult = await checkLogin(req);
    if (loginResult.err) {
      responseData.responseReturn(
        res,
        loginResult.status || 400,
        true,
        loginResult.err
      );
      return;
    }
    req.userID = loginResult.id;
  } catch (loginError) {
    console.error(loginError);
    responseData.responseReturn(res, 500, true, "Error checking login");
    return;
  }

  try {
    // Check role
    const roleCheckResult = await checkRole(req.userID);
    if (roleCheckResult.err) {
      responseData.responseReturn(
        res,
        roleCheckResult.status || 400,
        true,
        roleCheckResult.err
      );
      return;
    }
  } catch (roleError) {
    console.error(roleError);
    responseData.responseReturn(res, 500, true, "Error checking role");
    return;
  }

  try {
    // Get user
    const user = await modelUser.getOne(req.userID);
    responseData.responseReturn(res, 200, true, { data: user });
  } catch (getUserError) {
    console.error(getUserError);
    responseData.responseReturn(res, 500, true, "Error getting user data");
    return;
  }
};

const logout = function (req, res, next) {
  try {
    res.clearCookie("tokenJWT");
    responseData.responseReturn(res, 200, true, "Đăng xuất thành công");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  logout,
  profile,
};
