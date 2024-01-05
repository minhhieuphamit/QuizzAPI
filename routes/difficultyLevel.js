const express = require("express");
const router = express.Router();
const DifficultyLevelValidate = require("../validates/difficultyLevel");
const difficultyLevelController = require("../controllers/difficultyLevelController");

router.get("/", difficultyLevelController.getAll);

router.get("/:difficultyName", difficultyLevelController.findByName);

router.post(
  "/",
  DifficultyLevelValidate.validator(),
  difficultyLevelController.createDifficultyLevel
);

router.delete("/:id", difficultyLevelController.deleteDifficultyLevel);

router.put(
  "/:id",
  DifficultyLevelValidate.validator(),
  difficultyLevelController.updateDifficultyLevel
);

module.exports = router;
