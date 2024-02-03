const jwt = require('jsonwebtoken');
require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    image: String,
}, {
    timestamps: true
})

//Generate JWT token 
userSchema.methods.generateJWTAuthToken = function () {
    let token = jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.jsonPrivateKey, {
        expiresIn: process.env.EXPIRE_TIME
    })
    
    return token
}

module.exports = mongoose.model('user', userSchema)