const getAllConversations = require('../controller/getConversationListController')
const {
    authTokenMiddleware
} = require('../middleware/authMiddleware')


const router = require('express').Router()

router.get('/get-conversations', authTokenMiddleware, getAllConversations)

module.exports = router