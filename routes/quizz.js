const express = require("express");
const router = express.Router();
const quizzController = require("../controllers/quizzController");

router.post("/", quizzController.createQuizz);

module.exports = router;
