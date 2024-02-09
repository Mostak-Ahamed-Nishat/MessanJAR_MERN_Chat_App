
const {
    sendMessage
} = require('../controller/messagesController')
const {
    authTokenMiddleware
} = require('../middleware/authMiddleware')


const router = require('express').Router()

router.post('/messages', authTokenMiddleware, sendMessage)

module.exports = router