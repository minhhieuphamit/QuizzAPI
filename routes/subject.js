const express = require("express");
const router = express.Router();
const SubjectValidate = require("../validates/subject");
const subjectController = require("../controllers/subjectController");

router.get("/", subjectController.getAll);

router.get("/:subjectName", subjectController.findByName);

router.post("/", SubjectValidate.validator(), subjectController.createSubject);

router.delete("/:id", subjectController.deleteSubject);

router.put(
  "/:id",
  SubjectValidate.validator(),
  subjectController.updateSubject
);

module.exports = router;
