require("dotenv").config();
const env = require("../config/env.config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require("../models/User");

const registerUser = async (req, res) => {
    const { username, password, display_name } = req.body;

    if (!username || !password || !display_name) return res.status(400).json({message: "All fields must be filled"})

    // Cek Unique
    const cekUsername = await User.findOne({ username: username });
    if (cekUsername) return res.status(400).json({message: "Username is already used"})

    // Password
    let hashedPassword;
    await bcrypt.hash(password, 10).then((hash) => hashedPassword = hash);

    const newUser = await User.create({
        username: username,
        display_name: display_name,
        password: hashedPassword,
    })
    newUser.password = undefined;
    
    console.log("\nUser created successfully\n", newUser, "\n")
    return res.status(201).json({message: "User created successfully", data: newUser})
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({message: "All fields must be filled"})

    // Cek Email ada
    const user = await User.findOne({ username: username });
    if (user == null) return res.status(404).json({message: "Username is not registered"})
    
    // Cek Password
    const cekPassword = await bcrypt.compare(password, user.password);
    if (!cekPassword) return res.status(400).json({message: "Password is incorrect"})

    user.password = undefined;
    
    // JWT Token
    const accessToken = jwt.sign({
            user_id: user._id.toString(),
            username: user.username,
        },
        env("ACCESS_TOKEN_SECRET"),
        { expiresIn: '1d'}      // Development
        // { expiresIn: '5m'}   // Production
    )

    console.log("\nUser login Successfull\n")
    return res.status(200).json({message: "User login successfully", data: {username: user.username, token: accessToken}})
}

const getUser = async (req, res) => {
    const user = await User.findById(req.user_id);
    user.password = undefined;

    console.log("\nGet User Successfull\n")
    return res.status(200).json({message: "Get user successfully", data: user})
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
}