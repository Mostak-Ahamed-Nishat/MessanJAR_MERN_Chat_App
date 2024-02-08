const getAllConversations = require('../controller/getConversationListController')


const router = require('express').Router()

router.get('/get-conversations', getAllConversations)

module.exports = router