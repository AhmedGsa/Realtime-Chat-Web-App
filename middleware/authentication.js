const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("../errors")

const auth = async (req,res,next) => {
    const token = req.cookies.token
    if(!token) {
        throw new UnauthorizedError("Authentication failed");
    }
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userID: payload.userID}
        next()
    } catch (error) {
        throw new UnauthorizedError("Authentication failed!")
    }
}

module.exports = auth