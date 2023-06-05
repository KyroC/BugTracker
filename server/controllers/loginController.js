const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async(req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    //check if user exists
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const userForToken = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken, 
        process.env.SECRET,
        {expiresIn: 60*60})

    res
        .status(200)
        .send({token, user: user.name})
})

module.exports = loginRouter