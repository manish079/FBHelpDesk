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

const userLogin = async (req, res) => {
  const { emailOrMobile, password } = req.body;

  console.log("Email/Mobile:", emailOrMobile);
  console.log("Password:", password);

  if (!emailOrMobile || !password) {
    return res
      .status(400)
      .json({ message: "Email/Mobile and password are required" });
  }

  try {
    // Find the user by email or mobile number
    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    // If user doesn't exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, "your_secret_key", {
    //   expiresIn: "1h", // Token expiration time
    // });

    // Return success response with token
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
//     const isUserExist = User.findOne({
//       $or: [{ email }, { password }],
//     });

//     if (!isUserExist) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isPasswordMatch = await bcrypt.compare(
//       password,
//       isUserExist.password
//     );

//     if (!isPasswordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ isUserExist });
//     console.log("User password: " + isUserExist);
//   } catch (error) {
//     console.error("Error login user:", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };
