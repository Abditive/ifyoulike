const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
let profileCollection;

mongoClient
  .connect()
  .then((_) => {
    const db = mongoClient.db("ifyoulike");
    db.dropCollection("profile");
    profileCollection = db.collection("profile");
    profileCollection.insertMany([
      {
        user_id: "64dea5e3b1fa484324f56f11",
        watched_movies: [
          { movie_title: "", date_watched: "", review: "", liked: true },
        ],
        watched_tv: [
          { show_title: "", date_watched: "", review: "", liked: true },
        ],
      },
    ]);
  })
  .catch((error) => {
    console.log(error);
  });

router.use("*", (request, response, next) => {
  if (request.method !== "GET" && !request.session.name) {
    response
      .status(401)
      .json({ message: "must be logged in to perform this action" });
    return;
  }

  next();
});
