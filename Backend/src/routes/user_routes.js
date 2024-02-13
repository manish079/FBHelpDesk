const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");

router.post("/api/userRegister", userController.userRegister);
router.post("/api/userLogin", userController.loginUser);

// app.get("/auth/facebook", passport.authenticate("facebook"));

// Callback route after Facebook authentication
// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect to dashboard or any other route
//     res.redirect("/dashboard");
//   }
// );

// Sample protected route that requires authentication
// app.get("/dashboard", ensureAuthenticated, (req, res) => {
//   res.send("Welcome to the dashboard!");
// });

module.exports = router;
