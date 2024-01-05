const responseData = require("../helper/responseData");
const { validationResult } = require("express-validator");
const modelDifficultyLevel = require("../models/difficultyLevel");

const getAll = async (req, res, next) => {
  try {
    const difficultyLevels = await modelDifficultyLevel.getAll(req.query);
    responseData.responseReturn(res, 200, "Thành công", difficultyLevels);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const findByName = async (req, res, next) => {
  try {
    const difficultyLevel = await modelDifficultyLevel.getByName(
      req.params.difficultyName
    );
    if (!difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy DifficultyLevel"
      );
      return;
    }
    responseData.responseReturn(res, 200, "Thành công", difficultyLevel);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const createDifficultyLevel = async (req, res, next) => {
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

    const difficultyLevel = await modelDifficultyLevel.getByName(
      req.body.difficultyName
    );
    if (difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "DifficultyLevel đã tồn tại"
      );
    } else {
      const newDifficultyLevel =
        await modelDifficultyLevel.createDifficultyLevel({
          difficultyName: req.body.difficultyName,
        });
      responseData.responseReturn(
        res,
        200,
        "Tạo mới thành công",
        newDifficultyLevel
      );
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const deleteDifficultyLevel = async (req, res, next) => {
  try {
    const difficultyLevel = await modelDifficultyLevel.getOne(req.params.id);
    if (!difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy DifficultyLevel"
      );
      return;
    }
    await modelDifficultyLevel.deleteDifficultyLevel(req.params.id);
    responseData.responseReturn(res, 200, "Xóa thành công", difficultyLevel);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const updateDifficultyLevel = async (req, res, next) => {
  try {
    const difficultyLevel = await modelDifficultyLevel.getOne(req.params.id);
    if (!difficultyLevel) {
      responseData.responseReturn(
        res,
        404,
        false,
        "Không tìm thấy DifficultyLevel"
      );
      return;
    }
    const newDifficultyLevel = await modelDifficultyLevel.updateDifficultyLevel(
      req.params.id,
      req.body
    );
    responseData.responseReturn(
      res,
      200,
      "Cập nhật thành công",
      newDifficultyLevel
    );
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  getAll,
  findByName,
  createDifficultyLevel,
  deleteDifficultyLevel,
  updateDifficultyLevel,
};
