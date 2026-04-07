const express = require("express");
const router = express.Router();
const User = require("../models/user");

// REGISTER
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = new User({ username, password });
    await user.save();

    res.json("User registered");
});

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        res.json("Login success");
    } else {
        res.json("Invalid credentials");
    }
});

module.exports = router;