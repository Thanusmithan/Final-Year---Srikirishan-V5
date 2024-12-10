// // routes/appointmentRoutes.js---------------------------Corrected---------------------------------------------
// const express = require("express");
// const {
//     createAppointment,
//     getAppointments,
//     updateAppointment,
//     deleteAppointment,
// } = require("../controllers/appointmentController");
// const router = express.Router();

// router.post("/", createAppointment); // Create an appointment
// router.get("/", getAppointments); // Get all appointments
// router.put("/:id", updateAppointment); // Update an appointment by ID
// router.delete("/:id", deleteAppointment); // Delete an appointment by ID

// module.exports = router;



// // routes/appointmentRoutes.js
// const express = require("express");
// const {
//     createAppointment,
//     getAppointments,
//     updateAppointment,
//     deleteAppointment,
// } = require("../controllers/appointmentController");

// const router = express.Router();

// // Route to create an appointment
// router.post("/", createAppointment);

// // Route to get all appointments
// router.get("/", getAppointments);

// // Route to update an appointment by ID
// router.put("/:id", updateAppointment);

// // Route to delete an appointment by ID
// router.delete("/:id", deleteAppointment);

// module.exports = router;


// routes/appointmentRoutes.js-------------10.12.2024 ----corrected
const express = require("express");
const {
    createAppointment,
    getAppointments,
    getAppointmentsByUser, // Fetch user-specific appointments
    getAppointmentById,    // Fetch single appointment by ID
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

/**
 * @route   POST /api/appointments
 * @desc    Create a new appointment
 * @access  Public
 */
router.post("/", createAppointment);

/**
 * @route   GET /api/appointments
 * @desc    Get all appointments
 * @access  Public
 */
router.get("/", getAppointments);

/**
 * @route   GET /api/appointments/user/:email
 * @desc    Get all appointments for a specific user by email
 * @access  Public
 */
router.get("/user/:email", getAppointmentsByUser);

/**
 * @route   GET /api/appointments/:id
 * @desc    Get a single appointment by its ID
 * @access  Public
 */
router.get("/:id", getAppointmentById);

/**
 * @route   PUT /api/appointments/:id
 * @desc    Update an appointment by ID
 * @access  Public
 */
router.put("/:id", updateAppointment);

/**
 * @route   DELETE /api/appointments/:id
 * @desc    Delete an appointment by ID
 * @access  Public
 */
router.delete("/:id", deleteAppointment);

module.exports = router;
