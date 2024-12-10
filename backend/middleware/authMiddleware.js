// // authMiddleware.js----------------------------Corrected-------------------------------------------
// const jwt = require("jsonwebtoken");

// exports.verifyToken = (req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid token" });
//     }
// };

// exports.verifyAdmin = (req, res, next) => {
//     exports.verifyToken(req, res, () => {
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Admins only." });
//         }
//         next();
//     });
// };


// // authMiddleware.js------------Message----------------------------------------------------
// const jwt = require("jsonwebtoken");

// // Middleware to verify a token
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return res.status(401).json({ message: "No token provided. Authorization denied." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded token payload (user info) to the request object
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token has expired. Please log in again." });
//     }
//     res.status(403).json({ message: "Invalid token. Authorization denied." });
//   }
// };

// // Middleware to verify if the user is an admin
// const verifyAdmin = (req, res, next) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }
//     next();
//   } catch (error) {
//     console.error("Error in verifyAdmin middleware:", error.message);
//     res.status(500).json({ message: "Server error while verifying admin access." });
//   }
// };

// // Wrapper function to apply `verifyToken` first, then proceed to `verifyAdmin`
// const applyAdminCheck = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) return; // If `verifyToken` fails, it will handle the response
//     verifyAdmin(req, res, next);
//   });
// };

// // Exporting middleware functions
// module.exports = {
//   verifyToken,
//   verifyAdmin: applyAdminCheck, // Updated to wrap `verifyToken` and `verifyAdmin`
// };



// //authMiddleware.js--------------corrected -------------10.12.2024
// const jwt = require("jsonwebtoken");

// // Middleware to verify a token
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   // Debug log for token
//   console.log("Received Token:", token);

//   if (!token) {
//     console.error("No token provided.");
//     return res.status(401).json({ error: "No token provided. Authorization denied." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user info to req.user
//     console.log("Decoded Token:", req.user); // Debug log
//     next();
//   } catch (err) {
//     console.error("Token verification error:", err.message);
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ error: "Token has expired. Please log in again." });
//     }
//     res.status(403).json({ error: "Invalid token. Authorization denied." });
//   }
// };

// // Middleware to verify if the user has admin privileges
// const verifyAdmin = (req, res, next) => {
//   if (!req.user) {
//     console.error("User not authenticated.");
//     return res.status(401).json({ error: "User not authenticated." });
//   }
//   if (req.user.role !== "admin") {
//     console.error("Access denied. Admins only.");
//     return res.status(403).json({ error: "Access denied. Admins only." });
//   }
//   next();
// };

// // Middleware to verify specific roles
// const verifyRole = (roles) => (req, res, next) => {
//   if (!req.user) {
//     console.error("User not authenticated.");
//     return res.status(401).json({ error: "User not authenticated." });
//   }
//   if (!roles.includes(req.user.role)) {
//     console.error(`Access denied. Required roles: ${roles.join(", ")}`);
//     return res
//       .status(403)
//       .json({ error: `Access denied. Requires one of the following roles: ${roles.join(", ")}.` });
//   }
//   next();
// };

// // Combined middleware for admin-specific routes
// const verifyAdminAccess = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) return; // If token verification fails, the response is already handled
//     verifyAdmin(req, res, next); // Proceed to admin verification
//   });
// };

// module.exports = {
//   verifyToken, // General authentication
//   verifyAdmin: verifyAdminAccess, // Admin-only authentication
//   verifyRole, // Role-based authentication
// };



// // authMiddleware.js
// const jwt = require("jsonwebtoken");

// /**
//  * Middleware to verify a JWT token
//  */
// const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   console.log("Received Token:", token); // Debug log
//   if (!token) {
//     return res.status(401).json({ error: "No token provided. Authorization denied." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user details to request
//     console.log("Decoded Token:", req.user); // Debug log
//     next();
//   } catch (err) {
//     console.error("Token verification error:", err.message);
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ error: "Token has expired. Please log in again." });
//     }
//     res.status(403).json({ error: "Invalid token. Authorization denied." });
//   }
// };

// /**
//  * Middleware to verify admin access
//  */
// const verifyAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     console.error("Access denied. Admin privileges required.");
//     return res.status(403).json({ error: "Access denied. Admin privileges required." });
//   }
//   next();
// };

// /**
//  * Middleware to verify specific roles
//  * @param {Array} roles - Allowed roles
//  */
// const verifyRole = (roles) => (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ error: "User not authenticated." });
//   }
//   if (!roles.includes(req.user.role)) {
//     return res.status(403).json({
//       error: `Access denied. Requires one of the following roles: ${roles.join(", ")}`,
//     });
//   }
//   next();
// };

// module.exports = {
//   verifyToken,
//   verifyAdmin,
//   verifyRole,
// };



//authMiddleware.js--------------corrected -------------New code
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify a JWT token
 */
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please log in again.' });
    }
    return res.status(403).json({ error: 'Invalid token. Authorization denied.' });
  }
};

/**
 * Middleware to verify admin access
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required.' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
