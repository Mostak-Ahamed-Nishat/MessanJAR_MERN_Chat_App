const jwt = require('jsonwebtoken');
require('dotenv').config()
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    message: {
        text: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        }
    },
    status: {
        type: String,
        default: "unseen"
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('message', messageSchema)