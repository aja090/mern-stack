const router = require('express').Router()
const { registerUserCrtl, loginUserCrtl } = require("../controller/authController")

//! /api/auth/register
router.post("/register", registerUserCrtl)

//! /api/auth/Login
router.post("/login", loginUserCrtl)

module.exports = router