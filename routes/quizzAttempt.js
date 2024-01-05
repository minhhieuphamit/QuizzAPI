const express = require("express");
const router = express.Router();
const quizzAttemptController = require("../controllers/quizzAttemptController");

router.post("/", quizzAttemptController.saveQuizAttempt);

module.exports = router;
