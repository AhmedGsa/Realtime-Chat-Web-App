const { default: mongoose } = require("mongoose");


const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: [true, "Please provide a message!"],
        minlength: 1
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "please provide the sender id!"]
    },
    room: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
        required: [true, "please provide room id"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Message",messageSchema)