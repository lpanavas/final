// user.js try to
//get user's following
// user register
// user login

const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const bodyParser = require("body-parser");
require("dotenv").config();
require("dotenv/config");
const ObjectId = require("mongodb").ObjectID;

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

router.get("/userFollwing", async (request, response) => {
  try {
    const username = request.query.username;
    const currentUser = await db
      .collection("users")
      .findOne({ username: username });

    response.status(200).json({
      following: currentUser.following,
    });
  } catch (err) {
    response.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});
// router.get("/getContent/:houseId", async (req, res) => {
//   try {
//     const { houseId } = req.params;

//     const house = await db
//       .collection("housing")
//       .findOne({ _id: new ObjectId(houseId) });

//     res.status(200).json({
//       house: house,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: `Internal error: ${err}`,
//     });
//   }
// });
// function connect(callback) {
//   var MongoClient = require("mongodb").MongoClient;

//   const dbURI = "mongodb://localhost:27017";

//   var client = new MongoClient(dbURI);

//   client.connect(
//     function (err) {
//       if (err !== null) throw err;

//       var db = client.db("housing");
//       var dogposts = db.collection("users");

//       callback(dogposts, client);
//       res.redirect("/home");
//     },
//     { useNewUrlParser: true }
//   );
// }

// function updateVotes(c, callback) {
//   console.log(c);

//   connect(function (dogposts) {
//     dogposts.updateOne(
//       { username: c.username },
//       { $push: { following: c.following } },
//       function (err, result) {
//         if (err !== null) throw err;
//         res.redirect("/home");
//         callback(result);
//       }
//     );
//   });
// }

addFavorites = async (usernameInput, followingInput) => {
  const users = db.collection("users"); // access player collection
  await users.update(
    { username: usernameInput },
    { $addToSet: { following: followingInput } }
  );
  return;
};

router.post("/updateFollowing", async (req, res) => {
  let following = req.body.following;
  let username = req.body.username;
  addFavorites(username, following);
  res.redirect("/Following"); // redirect to home page
});

// function connect(callback) {
//   var MongoClient = require("mongodb").MongoClient;

//   const dbURI = "mongodb://localhost:27017";

//   var client = new MongoClient(dbURI);

//   client.connect(
//     function (err) {
//       if (err !== null) throw err;

//       var db = client.db("housing");
//       var users = db.collection("users");

//       callback(users, client);
//     },
//     { useNewUrlParser: true }
//   );
// }

// async function updateVotes(c, callback) {
//   const currentUser = await db
//     .collection("users")
//     .findOne({ username: c.username });

//   const currentId = currentUser._id;
//   console.log(currentUser.following);

//   connect(function (users) {
//     users.updateOne(
//       { _id: ObjectId(currentId) },

//       {
//         $push: {
//           following: c.following,
//         },
//         function(err, result) {
//           if (err !== null) throw err;
//           callback(result);
//         },
//       }
//     );
//   });
// }

// router.put("/updateFollowing", (req, res) => {
//   console.log("updateFollowing in back end");

//   updateVotes(
//     {
//       username: req.body.username,
//       following: req.body.following,
//     },
//     function (result) {
//       res.send(result);
//     }
//   );
// });

module.exports = router;
