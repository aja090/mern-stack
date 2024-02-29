const { default: mongoose } = require("mongoose");
const joi = require('joi') //? FOR VALIDATE
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        trem: true, //! يحذف الفراغات
        minlength: 2,
        maxlentgh: 100,
    },
    email: {
        type: String,
        required: true,
        trem: true, //! يحذف الفراغات
        minlength: 5,
        maxlentgh: 100,
        unique: true //! حتى ميتكرر عندي
    },
    password: {
        type: String,
        required: true,
        trem: true, //! يحذف الفراغات
        minlength: 8,
    },
    profilePhoto: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            publicid: null,
        },
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true, //! Adds createdAt and updatedAt timestamps
});

//todo validate register user
const validateRegisterUser = (obj) => {
    const schema = joi.object({
        username: joi.string().trim().required().min(2).max(100),
        email: joi.string().trim().required().email().min(5).max(100),
        password: joi.string().trim().required().min(8)
    })
    return schema.validate(obj)
}

//todo validate Login user
const validateLoginUser = (obj) => {
    const schema = joi.object({
        email: joi.string().trim().required().email().min(5).max(100),
        password: joi.string().trim().required().min(8)
    })
    return schema.validate(obj)
}

//todo Generate Auth Token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE)
}

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
}