// // authRoutes.js-------------------corrected--------------------------------------------
// // authRoutes.js
// // const express = require("express");
// // const { register, login, updateUser } = require("../controllers/authController");
// // const { verifyToken } = require("../middleware/authMiddleware");
// // const router = express.Router();

// // router.post("/signup", register); // POST route for signup
// // router.post("/login", (req, res) => {
// //     req.body.isAdmin = false; // Regular user login
// //     login(req, res);
// // });
// // router.post("/admin/login", (req, res) => {
// //     req.body.isAdmin = true; // Admin login
// //     login(req, res);
// // });
// // router.put("/update", verifyToken, updateUser); // PUT route for updating profile

// // module.exports = router;



// // authRoutes.js
// const express = require("express");
// const { register, login, updateUser } = require("../controllers/authController");
// const { verifyToken } = require("../middleware/authMiddleware");

// const router = express.Router();

// // User Signup Route
// router.post("/signup", register); // POST route for user registration

// // Regular User Login Route
// router.post("/login", (req, res) => {
//   console.log("Regular user login attempt."); // Debug log
//   req.body.isAdmin = false; // Set role for regular users
//   login(req, res);
// });

// // Admin Login Route
// router.post("/admin/login", (req, res) => {
//   console.log("Admin login attempt."); // Debug log
//   req.body.isAdmin = true; // Set role for admin users
//   login(req, res);
// });

// // Update User Profile Route
// router.put("/update", verifyToken, updateUser); // PUT route for updating profile

// module.exports = router;


// // authRoutes.js ------------Corrected ---------------10.12.2024
// const express = require("express");
// const { register, login, updateUser } = require("../controllers/authController");
// const { verifyToken } = require("../middleware/authMiddleware");

// const router = express.Router();

// /**
//  * @route POST /api/auth/signup
//  * @desc User registration
//  * @access Public
//  */
// router.post("/signup", async (req, res) => {
//   console.log("New user registration attempt.");
//   try {
//     await register(req, res);
//   } catch (error) {
//     console.error("Error during user signup:", error.message);
//     res.status(500).json({ message: "Error during user signup." });
//   }
// });

// /**
//  * @route POST /api/auth/login
//  * @desc Regular user login
//  * @access Public
//  */
// router.post("/login", async (req, res) => {
//   console.log("Regular user login attempt."); // Debug log
//   try {
//     req.body.isAdmin = false; // Mark as regular user
//     await login(req, res);
//   } catch (error) {
//     console.error("Error during regular user login:", error.message);
//     res.status(500).json({ message: "Login failed. Please try again." });
//   }
// });

// /**
//  * @route POST /api/auth/admin/login
//  * @desc Admin user login
//  * @access Public
//  */
// router.post("/admin/login", async (req, res) => {
//   console.log("Admin login attempt."); // Debug log
//   try {
//     req.body.isAdmin = true; // Mark as admin user
//     await login(req, res);
//   } catch (error) {
//     console.error("Error during admin login:", error.message);
//     res.status(500).json({ message: "Admin login failed. Please try again." });
//   }
// });

// /**
//  * @route PUT /api/auth/update
//  * @desc Update user profile
//  * @access Private (requires token)
//  */
// router.put("/update", verifyToken, async (req, res) => {
//   console.log(`User profile update attempt by user: ${req.user._id}`); // Debug log
//   try {
//     await updateUser(req, res);
//   } catch (error) {
//     console.error("Error updating user profile:", error.message);
//     res.status(500).json({ message: "Failed to update user profile." });
//   }
// });

// module.exports = router;



// authRoutes.js
const express = require("express");
const { register, login, updateUser } = require("../controllers/authController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc User registration
 * @access Public
 */
router.post("/signup", async (req, res) => {
  console.log("New user registration attempt.");
  try {
    await register(req, res);
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Error during user signup.", error: error.message });
  }
});

/**
 * @route POST /api/auth/login
 * @desc User login (Regular users)
 * @access Public
 */
router.post("/login", async (req, res) => {
  console.log("User login attempt.");
  try {
    req.body.isAdmin = false; // For regular users
    await login(req, res);
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

/**
 * @route POST /api/auth/admin/login
 * @desc Admin login
 * @access Public
 */
router.post("/admin/login", async (req, res) => {
  console.log("Admin login attempt.");
  try {
    req.body.isAdmin = true; // For admin users
    await login(req, res);
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ message: "Admin login failed.", error: error.message });
  }
});

/**
 * @route PUT /api/auth/update
 * @desc Update user profile
 * @access Private (requires valid token)
 */
router.put("/update", verifyToken, async (req, res) => {
  console.log(`Profile update attempt by user ID: ${req.user._id}`);
  try {
    await updateUser(req, res);
  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ message: "Failed to update profile.", error: error.message });
  }
});

/**
 * @route PUT /api/auth/admin/update
 * @desc Update user profile (Admin only)
 * @access Private (Admin-only)
 */
router.put("/admin/update", verifyAdmin, async (req, res) => {
  console.log(`Admin profile update attempt: User ID ${req.user._id}`);
  try {
    await updateUser(req, res);
  } catch (error) {
    console.error("Admin update error:", error.message);
    res.status(500).json({ message: "Admin profile update failed.", error: error.message });
  }
});

module.exports = router;
