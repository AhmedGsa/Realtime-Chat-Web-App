const jwt = require("jsonwebtoken")

const checkLoggedIn = async (req, res, next) => {
    const cookie = req.cookies.token || ""
    if(cookie !== "") {
        try {
            const token = await jwt.verify(cookie, process.env.JWT_SECRET)
            return res.redirect("/")
        } catch (error) {
            console.log(error);
        }
    }
    next()
}

module.exports = checkLoggedIn