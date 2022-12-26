const express = require("express")
const auth = require("../middleware/authentication");
const {getRooms} = require("../controllers/rooms")
const router = express.Router()

router.route("/").get(auth,getRooms)

module.exports = router