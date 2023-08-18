const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
require("dotenv").config();

const MongoStore = require("connect-mongo");
const expressSession = require("express-session"); // require express-session
// register a express session use a global middleware (must be in index.js/sever)
app.use(
  expressSession({
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/",
      dbName: "ifyoulike",
    }),
    secret: "key", // the session secret is used to create a hash to sign a cookie, prevent the cookie to be tenpered with.
  })
);

const usersController = require("./controllers/users.js");
app.use("/api/users", usersController);

const sessionController = require("./controllers/session.js");
app.use("/api/session", sessionController);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
