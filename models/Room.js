const { default: mongoose } = require("mongoose");


const roomSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user id"]
    },
    user2: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Pleae provide user id"]
    }
})

module.exports = mongoose.model("Room", roomSchema)