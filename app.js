const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { MongoClient, ObjectId } = require("mongodb");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRouter.js");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/houses");
const configurePassport = require("./auth/authConfig.js");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

configurePassport(app);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/build/index.html"));
});

module.exports = app;
