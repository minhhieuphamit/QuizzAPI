const jwt = require("jsonwebtoken");
const configs = require("../helper/configs");
const Role_DS = require("../helper/role");
const modelUser = require("../models/user");

module.exports = {
  checkLogin: async function (req) {
    const result = {};
    const token = req.headers.authorization;

    if (!token) {
      result.err = "Vui lòng đăng nhập";
      result.status = 401;
    }

    if (token.startsWith("Bearer ")) {
      const tokenWithoutPrefix = token.slice(7);
      try {
        const decodedToken = await jwt.verify(
          tokenWithoutPrefix,
          configs.SECRET_KEY
        );
        return { id: decodedToken.id };
      } catch (error) {
        result.err = "Vui lòng đăng nhập";
        result.status = 401; // Unauthorized
        return result;
      }
    } else {
      result.err = "Vui lòng đăng nhập";
      result.status = 401; // Unauthorized
      return result;
    }
  },

  checkRole: async function (userID, res, next) {
    const result = {};
    try {
      const user = await modelUser.getOne(userID);
      const role = user.role;
      const DSRole = Role_DS.DSRole_Read;
      if (DSRole.includes(role)) {
        return result;
      } else {
        result.err = "Bạn không đủ quyền.";
        result.status = 403; // Forbidden
        return result;
      }
    } catch (error) {
      console.error(error);
      result.err = "Internal Server Error.";
      result.status = 500; // Internal Server Error
      return result;
    }
  },
};
