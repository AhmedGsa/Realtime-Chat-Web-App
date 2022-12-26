const User = require("../models/User")
const { BadRequest, UnauthorizedError, CustomAPIError } = require("../errors/index")
const { StatusCodes } = require("http-status-codes")

const register = async (req,res) => {
    const { email, password, username } = req.body
    if(!email || !password || !username) {
        throw new BadRequest("Please provide email and password")
    }
    const user = await User.create({ email, password, username })
    const token = await user.createJWT()
    res.cookie("token", token, {httpOnly: true, maxAge: 1000*60*60*24*10})
    return res.redirect("/")
}

const login = async (req,res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user) {
        throw new BadRequest("Couldn't find user with provided email")
    }
    const correctPassword = await user.verifyPass(password)
    if(!correctPassword) {
        throw new BadRequest("Wrong Password!")
    }
    const token = await user.createJWT()
    res.cookie("token", token, {httpOnly: true, maxAge: 1000*60*60*24*10})
    res.redirect("/")
}

const logout = async (req,res) => {
    res.clearCookie("token");
    res.redirect("/login")
}

module.exports = {
    register,
    login,
    logout
}