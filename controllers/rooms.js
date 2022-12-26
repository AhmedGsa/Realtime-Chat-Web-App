const Room = require("../models/Room")
const User = require("../models/User")


const getRooms = async (req,res) => {
    const rooms1 = await Room.find({user1: req.user.userID})
    const rooms2 = await Room.find({user2: req.user.userID})
    let rooms = []
    for(let i=0;i<rooms1.length;i++) {
        let room = {
            room: rooms1[i]._id
        }
        const contact = await User.findOne({_id: rooms1[i].user2})
        room.contact = contact.username
        rooms.push(room)
    }
    for(let i=0;i<rooms2.length;i++) {
        let room = {
            room: rooms2[i]._id
        }
        const contact = await User.findOne({_id: rooms2[i].user1})
        room.contact = contact.username
        rooms.push(room)
    }
    res.status(200).json(rooms)
}

module.exports = {
    getRooms
}