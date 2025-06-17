const express    = require("express");
const router     = express.Router();
const userModel  = require("../models/user-model");
const bcrypt     = require("bcrypt");
const jwt        = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken");

router.get("/", (req, res) => {
    res.send("index");
});

router.post("/register", async (req, res) => {
    try {
        const { email, fullname, password } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    if (!email || !fullname || !password) {
                        return res.status(400).send("All fields are required");
                    }

                    const user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send("user created successfully");
                }
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
