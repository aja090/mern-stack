const asyncHandler = require('express-async-handler')
const { User } = require('../model/User')


/**--------------------------------------------
 * @desc  Get all users profile
 * @router /api/users/profile
 * @method GET 
 * @access private (only admin)  
--------------------------------------------*/

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {

    console.log(req.headers.authorization.split(' ')[1]);

    const users = await User.find()
    res.status(200).json(users)
})
