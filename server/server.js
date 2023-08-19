const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

require("dotenv").config();

const MongoStore = require("connect-mongo");
const expressSession = require("express-session");

app.use(
  cors({
    origin: "https://ifyoulike-front.onrender.com",
  })
);

app.options("*", cors());

app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_CONNECTION_STRING,
      dbName: "ifyoulike",
    }),
    secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  })
);

const usersController = require("./controllers/users.js");
app.use("/api/users", usersController);

const sessionController = require("./controllers/session.js");
app.use("/api/session", sessionController);

const profileController = require("./controllers/profile.js");
app.use("/api/profile", profileController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
