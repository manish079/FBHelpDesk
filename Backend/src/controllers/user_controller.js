const { bcrypt } = require("bcrypt");
const User = require("../model/user_model");

const userRegister = async (req, res) => {};
const userLogin = async (req, res) => {};

exports.facebookAuth = async (req, res) => {
  connectFacebook: async (req, res) => {
    try {
      // Implement logic to handle Facebook authentication callback
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
