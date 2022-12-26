# Realtime Chat Web Application
Front-end developed using HTML/CSS/JS

Back-end developed using Express.js and MongoDB with Socket.io library

## Setup

```bash
npm install && npm start
```

don't forget to add .env file containe the MONGO_URI, PORT, JWT_SECRET Variables.

## Functionality
- Register new user / login to existing user
- Authentication using JsonWebToken
- Adding Contacts
- Sending Messages
- Realtime Chat

## Future Upgrades
- Adding Chat Groups
- Adding Calls Functionality

## Routers

- auth.js
- messages.js
- rooms.js
- views.js