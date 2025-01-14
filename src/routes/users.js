const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUser,
} = require("../controllers/users");

const middleware = require("../middleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/detail", [ middleware.verifyJWT ], getUser);

module.exports = router;