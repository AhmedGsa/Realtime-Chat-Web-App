import { io } from "socket.io-client";

// Pop up when sending new message functionality

const addContactBtn = document.querySelector(".add-contact")
const popUpBg = document.querySelector(".pop-up-bg")
const popUp = document.querySelector(".pop-up")

addContactBtn.onclick = () => {
    popUpBg.classList.toggle("show");
    popUp.classList.toggle("show");
}
popUpBg.onclick = () => {
    popUpBg.classList.toggle("show");
    popUp.classList.toggle("show");
    errorDiv.style.display = "none";
}

// Sending messages and displaying them

const contactsDiv = document.querySelector(".contacts .bottom")
const messagesDiv = document.querySelector(".messages")
const msgInput = document.querySelector(".msg")
const sendMsgForm = document.querySelector(".send-msg")
const startDiv = document.querySelector(".start")

const socket = io("http://localhost:5000")
let joinedRoom;

const displayMessage = (message, fromSelf) => {
    const msg = document.createElement("div")
    msg.classList.add("message")
    msg.innerText = message
    if (fromSelf) {
        msg.classList.add("from-self")
    } else {
        msg.classList.add("from-other")
    }
    messagesDiv.appendChild(msg)
}

socket.on("receive-msg", (message) => {
    displayMessage(message, false)
})

sendMsgForm.onsubmit = async (e) => {
    e.preventDefault();
    const roomID = joinedRoom
    const msgText = msgInput.value;
    try {
        await axios.post("/api/v1/messages/sendMessageToContact", {
            msg: msgText,
            roomID: joinedRoom
        })
        displayMessage(msgText, true)
        socket.emit("send-msg", msgText, roomID)
        msgInput.value = ""
    } catch (error) {
        console.log(error);
    }
}

// Loading contacts, messages and joining rooms

const loadData = async () => {

    const res = await axios.get("/api/v1/rooms")
    const rooms = res.data
    for (let i = 0; i < rooms.length; i++) {
        const contactCard = document.createElement("div")
        contactCard.classList.add("contact-card")
        contactCard.id = rooms[i].room
        const contact = document.createElement("h4")
        contact.innerText = rooms[i].contact
        const lastMsg = document.createElement("p")
        const { data: { data } } = await axios.get(`/api/v1/messages/getMessages/${rooms[i].room}`)
        lastMsg.innerText = data[data.length - 1].message
        contactCard.appendChild(contact)
        contactCard.appendChild(lastMsg)
        contactCard.onclick = async () => {
            if (joinedRoom) {
                socket.emit("leave-room", joinedRoom)
            } else {
                startDiv.style.display = "none"
                messagesDiv.style.display = "flex"
                sendMsgForm.style.display = "flex"
            }
            messagesDiv.innerHTML = ""
            socket.emit("join-room", rooms[i].room)
            joinedRoom = rooms[i].room
            const { data: { data } } = await axios.get(`/api/v1/messages/getMessages/${rooms[i].room}`)
            for (let i = 0; i < data.length; i++) {
                const message = document.createElement("div")
                message.classList.add("message")
                message.innerText = data[i].message
                if (data[i].fromSelf == true) {
                    message.classList.add("from-self")
                } else {
                    message.classList.add("from-other")
                }
                messagesDiv.appendChild(message)
            }
        }
        contactsDiv.appendChild(contactCard)
    }
}
loadData();

// Adding new contacts

const addContactForm = document.querySelector(".add-contact-form");
const errorDiv = document.querySelector(".error")
addContactForm.onsubmit = async (e) => {
    e.preventDefault();
    const usernameInput = document.querySelector("#username");
    const messageInput = document.querySelector("#message");
    const username = usernameInput.value;
    const message = messageInput.value;
    try {
        await axios.post("/api/v1/messages/sendMessage", {
            receiver: username,
            message
        })
        window.location.reload()
    } catch (error) {
        const { response: { data: { msg } } } = error
        errorDiv.innerText = msg;
        errorDiv.style.display = "block";
        usernameInput.value = "";
        messageInput.value = "";
    }

}

// Logout Functionality

const logoutBtn = document.querySelector(".logout")

logoutBtn.onclick = async () => {
    await axios.get("/api/v1/auth/logout")
    window.location.href = "/login"
}
