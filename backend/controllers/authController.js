// // // authController.js------------------------------corrected -------10.12.2024
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Use a different email to SignUp!" });
//     }

   
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "user", 
//     });
//     await user.save();

//     console.log("User registered successfully:", user._id);

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // User Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password, isAdmin } = req.body;
//     const user = await User.findOne({ email });

//     // Check if user exists
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     if (isAdmin && user.role !== "admin") {
//       return res.status(403).json({ message: "email already exists" });
//     }

//     if (isAdmin===false && user.role === "admin") {
//       return res.status(403).json({ message: "email already exists" });
//     }


//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     console.log("User logged in:", user._id);

//     res.json({
//       token,
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update User Information
// exports.updateUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone } = req.body;
//     const userId = req.user._id;

//     // Find user by ID and update details
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { firstName, lastName, email, phone },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("User updated successfully:", updatedUser._id);

//     res.json({
//       message: "User updated successfully",
//       user: {
//         _id: updatedUser._id,
//         firstName: updatedUser.firstName,
//         lastName: updatedUser.lastName,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         role: updatedUser.role,
//       },
//     });
//   } catch (error) {
//     console.error("Update error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // authController.js
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // User Registration
// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists. Please use a different email." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "user", // Default role for new users
//     });

//     await user.save();

//     console.log(`User registered successfully. User ID: ${user._id}`);

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//       },
//     });
//   } catch (error) {
//     console.error("Registration Error:", error.message);
//     res.status(500).json({ message: "Server error during registration." });
//   }
// };

// // User Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password, isAdmin } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Validate role-based login
//     if (isAdmin && user.role !== "admin") {
//       return res.status(403).json({ message: "Admin credentials required." });
//     }
//     if (isAdmin === false && user.role === "admin") {
//       return res.status(403).json({ message: "Access denied for regular users." });
//     }

//     // Compare password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     console.log(`User logged in. User ID: ${user._id}`);

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     res.status(500).json({ message: "Server error during login." });
//   }
// };

// // Update User Information (including password change)
// exports.updateUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, password } = req.body;
//     const userId = req.user._id;

//     console.log(`User profile update request received for User ID: ${userId}`);

//     // Find the user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Update the fields if provided
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;
//     if (phone) user.phone = phone;

//     // Update password if provided
//     if (password) {
//       if (password.length < 6) {
//         return res.status(400).json({ message: "Password must be at least 6 characters long." });
//       }
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       user.password = hashedPassword;
//       console.log("Password updated successfully.");
//     }

//     // Save the updated user information
//     await user.save();

//     console.log(`User updated successfully. User ID: ${user._id}`);

//     res.json({
//       message: "Profile updated successfully",
//       user: {
//         _id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Server error during profile update." });
//   }
// };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "user", // Default role for new users
    });

    await user.save();

    console.log(`User registered successfully. User ID: ${user._id}`);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Server error during registration." });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Role-based login validation
    if (isAdmin && user.role !== "admin") {
      return res.status(403).json({ message: "Admin credentials required." });
    }
    if (isAdmin === false && user.role === "admin") {
      return res.status(403).json({ message: "Access denied for regular users." });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`User logged in. User ID: ${user._id}`);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error during login." });
  }
};

// Update User Information (including password change)
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const userId = req.user._id;

    console.log(`User profile update request received for User ID: ${userId}`);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // Update password if provided
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      console.log("Password updated successfully.");
    }

    // Save the updated user information
    await user.save();

    console.log(`User updated successfully. User ID: ${user._id}`);

    res.json({
      message: "Profile updated successfully.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: "Server error during profile update." });
  }
};
