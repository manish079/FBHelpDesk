const express = require("express");
const app = express();
const databaseConnection = require("./src/config/database_config.js");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./src/routes/user_routes.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());


// Connect to the database and return a promise
const dbPromise = databaseConnection.connectToDatabase();
dbPromise
  .then(() => console.log("Database is connected"))
  .catch((e) => console.log("DB error: " + e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/home", (req, res) => {
  res.send("Hello World!");
});

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
