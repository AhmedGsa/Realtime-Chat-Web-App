const express = require("express")
const router = express.Router();
const {login, register, home} = require("../controllers/views")
const checkLoggedIn = require("../middleware/check-loggedin")
const notLoggedInTest = require("../middleware/not-loggedin")

router.route("/").get(notLoggedInTest,home)
router.route("/login").get(checkLoggedIn,login)
router.route("/register").get(checkLoggedIn,register)

module.exports = router