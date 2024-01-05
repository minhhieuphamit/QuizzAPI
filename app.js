var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var authenRouter = require("./routes/authen");
var difficultyLevelRouter = require("./routes/difficultyLevel");
var subjectRouter = require("./routes/subject");
var questionRouter = require("./routes/question");
var quizzRouter = require("./routes/quizz");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/authen", authenRouter);
app.use("/api/v1/difficulty-levels", difficultyLevelRouter);
app.use("/api/v1/subjects", subjectRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/quizzes", quizzRouter);

mongoose.connect("mongodb://127.0.0.1:27017/Quizz_API_DB");
mongoose.connection.once("open", function () {
  console.log("Connect database success");
});
mongoose.connection.on("error", function () {
  console.log("Connect database failed");
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
