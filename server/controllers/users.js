const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGO_DB_CONNECTION_STRING);
let usersCollection;

mongoClient
  .connect()
  .then((_) => {
    const db = mongoClient.db("ifyoulike");
    // db.dropCollection("users");
    usersCollection = db.collection("users");
  })
  .catch((error) => {
    console.log(error);
  });

router.get("/", (_, response) => {
  usersCollection
    .find()
    .toArray()
    .then((users) => {
      return response.json(users);
    });
});

router.post("/", (request, response) => {
  console.log("inserted");
  const bcrypt = require("bcrypt");
  const passwordHash = bcrypt.hashSync(
    request.body.password,
    bcrypt.genSaltSync()
  );

  if (!request.body.username || !request.body.email || !request.body.password) {
    response.status(400).json({ message: "missing mandatory fields" });
    return;
  }

  // if (request.body.password.length < 8) {
  //     response.status(400).json({ message: "password must be 8 characters or more"});
  //     return;
  // }

  usersCollection
    .findOne({
      $or: [{ email: request.body.email }, { name: request.body.username }],
    })
    .then((user) => {
      if (user) {
        console.log("internal user" + user);
        response.status(400).json({
          message: `Email ${request.body.email} or username already exists`,
        });
        return;
      }

      usersCollection
        .insertOne({
          username: request.body.username,
          email: request.body.email,
          passwordHash: passwordHash,
        })
        .then((_) => {
          response.json({ message: "inserted" });
        });
    });
});

module.exports = router;
