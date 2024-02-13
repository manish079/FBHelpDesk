const mongoose = require("mongoose");
const DATABASE_NAME = require("../const/const.js").DATABASE_NAME;

exports.connectToDatabase = async (req, res) => {
  mongoose
    .connect(`mongodb://localhost:27017/${DATABASE_NAME}`)
    .then(() => {
      console.log(
        `MongoDB connected at: +mongodb://localhost:27017/${DATABASE_NAME}`
      );
    })
    .catch((e) => {
      console.log("Database is not connected! " + e);
    });
};
