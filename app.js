require("dotenv").config();
require("express-async-errors")
const express = require('express')
const path = require("path")
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const viewsRouter = require("./routes/views");
const messagesRouter = require("./routes/messages");
const roomsRouter = require("./routes/rooms")
const cookieParser = require("cookie-parser");
const errorHandlerMiddleware = require("./middleware/error-handler")
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/messages",messagesRouter)
app.use("/api/v1/rooms",roomsRouter)
app.use("/",viewsRouter)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    await connectDB(process.env.MONGO_URI)
    server.listen(port, console.log(`Server is listening on port ${port}`));
}

io.on("connection", (socket) => {
    socket.on("send-msg", (message, roomID) => {
        socket.to(roomID).emit("receive-msg",message)
    })
    socket.on("join-room", (room) => {
        socket.join(room);
    })
    socket.on("leave-room", (room) => {
        socket.leave(room);
    })
})

start();