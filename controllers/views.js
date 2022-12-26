const login = (req,res) => {
    res.render('login')
}

const register = (req,res) => {
    res.render("register")
}

const home = (req,res) => {
    res.render("home")
}

module.exports = {
    login,
    register,
    home
}