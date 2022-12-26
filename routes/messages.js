const express = require("express");
const {sendMessage, getMessages, sendMessageToContact} = require("../controllers/messages");
const auth = require("../middleware/authentication");
const router = express.Router();

router.route("/sendMessage").post(auth,sendMessage)
router.route("/sendMessageToContact").post(auth,sendMessageToContact)
router.route("/getMessages/:roomID").get(auth,getMessages)

module.exports = router