const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const passport = require("passport");
const assert = require("assert");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const router = express.Router();

const url = "mongodb://localhost:27017";
let db;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoClient.connect(
  url,
  { useUnifiedTopology: true },
  function (error, client) {
    assert.equal(error, null);
    db = client.db("housing");
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      console.log("Logged in", req.body);
      res.redirect("/home?username=" + req.user.username);
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  try {
    req.logOut();
    console.log("loggedout");
    res.redirect("/");
  } catch (err) {
    res.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});

router.get("/getUser", (req, res) => {
  res.send({ username: req.user ? req.user.username : null });
});

router.post("/register", async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    console.log("ok");

    await db.collection("users").insertOne({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
      following: [],
    });

    res.redirect("/home?username=" + req.body.username);
  } catch (err) {
    res.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});
module.exports = router;
