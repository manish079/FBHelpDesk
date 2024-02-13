const express = require("express");
const app = express();
const databaseConnection =
  require("./src/config/database_config.js").connectToDatabase();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
