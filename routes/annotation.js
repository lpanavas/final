// // annonation.js try to put annotation, get annptation , delte annotation

// // post annotation by user and post id
// // get annotation by user and post id

// // delete annotation by user and post id

// const express = require("express");
// const router = express.Router();
// const mongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
// const objectId = require("mongodb").ObjectID;
// require("dotenv").config();
// // Connection URL
// const url = process.env.MONGODB_URI || require("./mongoDetails.js");

// let db;

// router.get("/getAnnotations", function (request, response) {
//   const tableName = "annotations";
//   const userId = request.query.userId;
//   const postId = request.query.postId;
//   const cursor = db
//     .collection(tableName)
//     .find({ userId: userId, postId: postId }, { limit: 10 });
//   cursor
//     .sort({ time: -1 })
//     .map((e) => {
//       return {
//         id: e._id,
//         comment: e.comment,
//         time: e.time,
//       };
//     })
//     .toArray(function (error, result) {
//       response.send(result);
//     });
// });

// router.post("/addAnnotations", function (request, response) {
//   const tableName = "annotations";
//   const data = request.body.data;
//   db.collection(tableName).insertOne(
//     {
//       userId: data.userId,
//       postId: data.postId
//       comment: data.comment,
//       time: new Date(),
//     },
//     function (error, result) {
//       if (error !== undefined && error !== null) {
//         response.status(500);
//         response.send(
//           "Since server encounters error, add new comment failed. details: " +
//             error.message
//         );
//       } else if (result == null) {
//         response.status(400);
//         response.send("Cannot find add comment for video " + data.videoId);
//       } else {
//         response.status(200).end();
//       }
//     }
//   );
// });

// module.exports = router;
