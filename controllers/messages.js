const { BadRequest, UnauthorizedError } = require("../errors");
const Message = require("../models/Message");
const User = require("../models/User");
const Room = require("../models/Room")

const sendMessage = async (req,res) => {
    const {message, receiver} = req.body;
    if(!message || !receiver) {
        throw new BadRequest("Please provide message and receiver!")
    }
    const sender = req.user.userID
    const receiverID = await User.findOne({username: receiver}).select("_id")
    if(!receiverID) {
        throw new BadRequest("Receiver does not exist");
    }
    const room1 = await Room.findOne({user1: sender, user2: receiverID._id})
    let roomID;
    if(!room1) {
        const room2 = await Room.findOne({user1: receiverID._id, user2: sender})
        if(!room2) {
            const room = await Room.create({user1: sender, user2: receiverID._id})
            roomID = room._id
        } else {
            roomID = room2._id
        }
    } else {
        roomID = room1._id
    }
    await Message.create({msg: message, sender, room: roomID})
    res.status(200).json({msg: "Message sent successfully !"})
}

const sendMessageToContact = async (req,res) => {
    const {msg, roomID} = req.body
    if(!msg || !roomID) {
        throw new BadRequest("Please provide required information!")
    }
    const room = await Room.findOne({_id: roomID})
    if(!room) {
        throw new BadRequest("Room doesn't exist!")
    }
    await Message.create({room: roomID, msg, sender: req.user.userID})
    res.status(200).json({msg: "Message sent successfully!"})
}

const getMessages = async (req,res) => {
    const {userID} = req.user
    const {roomID} = req.params
    const room = await Room.findOne({_id: roomID})
    if(room.user1 != userID && room.user2 != userID) {
        throw new UnauthorizedError("Unauthorized!")
    }
    const messages = await Message.find({room: roomID}).select("msg sender").sort("createdAt")
    const messagesText = []
    for (let i = 0; i < messages.length; i++) {
        const sender = await User.findOne({_id: messages[i].sender})
        const fromSelf = sender._id == userID
        messagesText.push({
            sender: sender.username,
            message: messages[i].msg,
            fromSelf
        })
    }
    res.status(200).json({data: messagesText})
}

module.exports = {
    sendMessage,
    getMessages,
    sendMessageToContact
}