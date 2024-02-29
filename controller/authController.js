const asyncHandler = require('express-async-handler') //? Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const bcrypt = require('bcryptjs')
const { User, validateRegisterUser, validateLoginUser } = require("../model/User")

/**--------------------------------------------
 * @desc Register new user - Sign up
 * @router /api/auth/register
 * @method POST
 * @access public  
--------------------------------------------*/

module.exports.registerUserCrtl = asyncHandler(async (req, res) => {

    //?Algorthim of Register new user

    //* 1 Validation // يفضل كتابته في ملف مودل
    const { error } = validateRegisterUser(req.body)

    if (error) {
        return res.status(400).json({ mssg: error.details[0].message });
    }

    //* 2 Is user alredy exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).json({ mssg: "user is already exist " })
    }

    //* 3 hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    //* 4 new user and save it to Db
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })
    await user.save()

    // todo - sending email (verfiy account)

    //* 5 send response to the client
    res.status(201).json({
        mssg: "You registered successfully 👌, please log in 👀 "
    })
})



/**--------------------------------------------
 * @desc Login user
 * @router /api/auth/login
 * @method POST
 * @access public  
--------------------------------------------*/

module.exports.loginUserCrtl = asyncHandler(async (req, res) => {

    //?Algorthim of Login user

    //* 1- validation
    const { error } = validateLoginUser(req.body)

    if (error) {
        res.status(400).json({ mssg: error.details[0].message })
    }

    //* 2- is user exist
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).json({ message: "invalid email or password" })
    }

    //* 3- check the password
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: "invalid email or password" })
    }

    // todo - sending email (verfiy account if not verfied)

    //* 4- generate token (jwt)
    const token = user.generateAuthToken();

    //* 5- response the client
    res.status(200).json({

        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    });
})