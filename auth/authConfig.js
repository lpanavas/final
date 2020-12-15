var passport = require("passport");
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const Strategy = require("passport-local").Strategy;
const ObjectId = require("mongodb").ObjectID;
// const db = require("./db");

const bcrypt = require("bcrypt");
const session = require("express-session");

const bodyParser = require("body-parser");

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

module.exports = function configurePassport(app) {
  passport.use(
    new Strategy(
      { usernameField: "email" },
      async function (email, password, cb) {
        console.log("Authenticating", email, password);

        try {
          //findByUserName shoube be a backend function, mongoDB function
          const user = await db.collection("users").findOne({ email: email });

          // Didn't find the user
          if (!user) {
            console.log("User not found");
            return cb(null, false, { message: "Incorrect email address." });
          }
          if (await bcrypt.compare(password, user.password)) {
            console.log("User athenticated");
            return cb(null, user);
          } else {
            return cb(null, false, { message: "Incorrect password." });
          }
        } catch (err) {
          console.log("Error auth", err);
          return cb(err, null);
        }
      }
    )
  );

  // User serializer and deserializer
  passport.serializeUser(async (user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async function (id, cb) {
    try {
      const user = await db.collection("user").findOne({
        _id: ObjectId(id),
      });
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });

  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "I'm original",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};
