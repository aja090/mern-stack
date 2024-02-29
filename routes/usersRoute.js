const router = require('express').Router()
const { getAllUsersCtrl } = require('../controller/usersController')

//! /api/users/profile
router.get("/profile", getAllUsersCtrl)

module.exports = router