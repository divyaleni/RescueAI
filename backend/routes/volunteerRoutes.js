const express = require("express");
const router = express.Router();

const Volunteer = require("../models/Volunteer");

// Test route
router.get("/test", (req, res) => {
    res.json({
        message: "Volunteer route is working"
    });
});

// Register volunteer
router.post("/", async (req, res) => {
    try {
        console.log("Volunteer registration request received");
        console.log("Received data:", req.body);

        const {
            name,
            email,
            password,
            phone,
            vehicle,
            baseAddress,
            maxDistance,
            availability
        } = req.body;

        // Check required fields
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !vehicle ||
            !baseAddress ||
            !maxDistance ||
            !availability
        ) {
            return res.status(400).json({
                message: "All volunteer fields are required"
            });
        }

        // Check existing volunteer
        const existingVolunteer = await Volunteer.findOne({
            email: email.toLowerCase()
        });

        if (existingVolunteer) {
            return res.status(400).json({
                message: "Volunteer already exists with this email"
            });
        }

        // Create volunteer
        const volunteer = new Volunteer({
            name: name,
            email: email.toLowerCase(),
            password: password,
            phone: phone,
            vehicle: vehicle,
            baseAddress: baseAddress,
            maxDistance: Number(maxDistance),
            availability: availability
        });

        // Save to MongoDB
        const savedVolunteer = await volunteer.save();

        console.log(
            "Volunteer saved successfully:",
            savedVolunteer._id
        );

        res.status(201).json({
            message: "Volunteer registered successfully",
            volunteer: savedVolunteer
        });

    } catch (error) {
        console.error("Volunteer registration error:", error);

        res.status(500).json({
            message: "Failed to register volunteer",
            error: error.message
        });
    }
});

module.exports = router;