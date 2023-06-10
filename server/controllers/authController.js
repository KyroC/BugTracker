const User = require('../models/userModel')

exports.signupGetController = (req,res,next) => {
    res.status(200).render('pages/auth/signup', {
        title: 'Register Your Account' ,
        error : {},
        value: {}
    })
}

exports.signupPostController = async (req,res,next) => {
    let {name, address, email, password} = req.body

    return res.render('pages/auth/signup',
    {
        title: 'Register Your Account',
        value: {
            name,phone,address,nid,email,password
        }
    })
}

try{
    let user = new User({
        name,
        address,
        email,
        password
    })
    let createdUser = await user.save()
    res.redirect('/pages/auth/login', {title: 'Log In to your account'})
    return createdUser
} catch(err) {
    console.log(err)
    next(err)
}