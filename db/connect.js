const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const connectDB = (url) => mongoose.connect(url)

module.exports = connectDB;