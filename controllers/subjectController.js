const responseData = require("../helper/responseData");
const { validationResult } = require("express-validator");
const modelSubject = require("../models/subject");

const getAll = async (req, res, next) => {
  try {
    const subjects = await modelSubject.getAll(req.query);
    responseData.responseReturn(res, 200, "Thành công", subjects);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const findByName = async (req, res, next) => {
  try {
    const subject = await modelSubject.getByName(req.params.subjectName);
    if (!subject) {
      responseData.responseReturn(res, 404, false, "Không tìm thấy Subject");
      return;
    }
    responseData.responseReturn(res, 200, "Thành công", subject);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const createSubject = async (req, res, next) => {
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

    const subject = await modelSubject.getByName(req.body.subjectName);
    if (subject) {
      responseData.responseReturn(res, 404, false, "Subject đã tồn tại");
    } else {
      const newSubject = await modelSubject.createSubject(req.body);
      responseData.responseReturn(res, 200, "Thành công", newSubject);
    }
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const updateSubject = async (req, res, next) => {
  try {
    const subject = await modelSubject.getOne(req.params.id);
    if (!subject) {
      responseData.responseReturn(res, 404, false, "Không tìm thấy Subject");
      return;
    }
    const updatedSubject = await modelSubject.updateSubject(
      req.params.id,
      req.body
    );
    responseData.responseReturn(res, 200, "Thành công", updatedSubject);
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const subject = await modelSubject.getOne(req.params.id);
    if (!subject) {
      responseData.responseReturn(res, 404, false, "Không tìm thấy Subject");
      return;
    }
    await modelSubject.deleteSubject(req.params.id);
    responseData.responseReturn(res, 200, "Thành công");
  } catch (error) {
    console.error(error);
    responseData.responseReturn(res, 500, true, "Internal Server Error");
  }
};

module.exports = {
  getAll,
  findByName,
  createSubject,
  updateSubject,
  deleteSubject,
};
