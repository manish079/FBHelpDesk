const bcrypt = require("bcrypt");
const User = require("../model/user_model");

exports.userRegister = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword, // Save hashed password
    });

    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email/Mobile and password are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { password: password }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.connectToFacebook = async (req, res) => {};
