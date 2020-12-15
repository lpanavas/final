const express = require("express");
const ObjectId = require("mongodb").ObjectId;
const assert = require("assert");
const mongoClient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");

const router = express.Router();

const url = process.env.MONGODB_URI;
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

router.get("/getList/:author", async (req, res) => {
  try {
    const tableName = "housing";
    const { author } = req.params;
    const cursor = db
      .collection(tableName)
      .find({ author: author }, { limit: 10 });
    cursor
      .sort({ time: -1 })
      .map((e) => {
        return {
          id: e._id,
          title: e.title,
          image: e.images[0],
        };
      })
      .toArray(function (error, result) {
        res.send(result);
      });
  } catch (err) {
    res.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});

router.get("/getContent/:houseId", async (req, res) => {
  try {
    const { houseId } = req.params;
    console.log(houseId);

    const house = await db
      .collection("housing")
      .findOne({ _id: new ObjectId(houseId) });

    res.status(200).json({
      house: house,
    });
  } catch (err) {
    res.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { neighborhood, rooms, minPrice, maxPrice, page } = req.query;

    const pageSize = 24;
    let query;

    // 给每一个field fuzhi
    // ask

    if (neighborhood) {
      query = {
        bedrooms: parseInt(rooms),
        price: { $gt: parseInt(minPrice), $lt: parseInt(maxPrice) },
        neighborhood: neighborhood,
      };
    } else {
      query = {
        bedrooms: parseInt(rooms),
        price: { $gt: parseInt(minPrice), $lt: parseInt(maxPrice) },
      };
    }
    console.log(query);
    const cursor = db
      .collection("housing")
      .find(query)
      .sort({ _id: 1 })
      .skip((parseInt(page) - 1) * pageSize)
      .limit(pageSize);

    const apartments = await cursor.toArray();

    const countCursor = db.collection("housing").find(query);
    const apartmentCount = await countCursor.count();

    res.status(200).json({
      count: apartmentCount,
      pages: Math.ceil(apartmentCount / pageSize),
      apartments: apartments,
    });
  } catch (err) {
    res.status(500).json({
      message: `Internal error: ${err}`,
    });
  }
});

router.get("/getAnnotations", async (request, response) => {
  const tableName = "annotations";
  const username = request.query.username;
  const postId = request.query.postId;
  const cursor = await db
    .collection(tableName)
    .find({ username: username, postId: postId }, { limit: 10 });
  cursor
    .sort({ time: -1 })
    .map((e) => {
      return {
        comment: e.comment,
        time: e.time,
      };
    })
    .toArray(function (error, result) {
      response.send(result);
    });
});

router.post("/addAnnotations", async (request, response) => {
  const tableName = "annotations";
  const data = request.body;
  await db.collection(tableName).insertOne(
    {
      username: data.username,
      postId: data.postId,
      comment: data.comment,
      time: new Date(),
    },
    function (error, result) {
      if (error !== undefined && error !== null) {
        response.status(500);
        response.send(
          "Since server encounters error, add new comment failed. details: " +
            error.message
        );
      } else if (result == null) {
        response.status(400);
        response.send("Cannot find add comment for video " + data.videoId);
      } else {
        response.redirect("/getContent/" + request.body.postId);
      }
    }
  );
});

module.exports = router;
