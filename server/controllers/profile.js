const express = require("express");
const router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");
const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
let profileCollection;

mongoClient
  .connect()
  .then((_) => {
    const db = mongoClient.db("ifyoulike");
    // db.dropCollection("profile");
    profileCollection = db.collection("profile");
    profileCollection.insertMany([
      {
        user_email: "andreina@gmail.com",
        saved_recommendation: "hello",
      },
    ]);
  })
  .catch((error) => {
    console.log(error);
  });

router.use("*", (request, response, next) => {
  if (request.method !== "GET" && !request.session.email) {
    response
      .status(401)
      .json({ message: "must be logged in to perform this action" });
    return;
  }

  next();
});

// GET saved recommendations
router.get("/", (request, response) => {
  console.log(request.session.email);
  profileCollection
    .find({ user_email: request.session.email })
    .toArray()
    .then((recom) => {
      response.json(recom);
    })
    .catch((err) => console.error(err));
});

// POST recommendations
router.post("/", (request, response) => {
  profileCollection
    .insertOne(request.body)
    .then((_) => {
      response.json({ message: "inserted recom" });
    })
    .catch((err) => console.error(err));
});
module.exports = router;
