const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//  JWT SECRET KEY (REQUIRED)
const JWT_SECRET = "mysecretkey123";

// SIMPLE TEST API

router.get('/simpleapi', (req, res) => {
    res.json({ message: "Hello world, API working" });
});

// SIGNUP API

router.post('/signupapi', async (req, res) => {

    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "Password and Confirm Password do not match"
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
        message: "Account created successfully"
    });
});


// LOGIN API

router.post('/loginapi', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// JWT MIDDLEWARE

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied. Token missing"
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        req.userId = decoded.userId;
        next();
    });
};

// PROTECTED DASHBOARD ROUTE

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({
        message: "Welcome to your dashboard!"
    });
});


module.exports = router;