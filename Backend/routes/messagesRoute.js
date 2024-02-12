const {
    getMessages,
    sendMessage,
    sendImageMessage
} = require('../controller/messagesController')
const {
    authTokenMiddleware
} = require('../middleware/authMiddleware')


const router = require('express').Router()

router.post('/', authTokenMiddleware, sendMessage)
router.get('/chat/:id', authTokenMiddleware, getMessages)
router.post('/image', authTokenMiddleware, sendImageMessage)
// router.post('/image', async (req, res) => {
//     console.log("Hello");
// })

module.exports = router