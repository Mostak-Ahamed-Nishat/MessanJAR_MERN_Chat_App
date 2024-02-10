
const {
    getMessages,
    sendMessage
} = require('../controller/messagesController')
const {
    authTokenMiddleware
} = require('../middleware/authMiddleware')


const router = require('express').Router()

router.post('/messages', authTokenMiddleware, sendMessage)
router.get('/messages/chat/:id', authTokenMiddleware, getMessages)

module.exports = router