const express = require("express");
const router = express.Router();
const authController = require('../controller/auth')
const verifyJwt = require("../middlewares/VerifyToken");

router.post("/register",authController.registerUser);

router.post("/login", authController.loginUser);

router.patch("/update",verifyJwt.verifyToken, authController.updateUser);




module.exports = router;
