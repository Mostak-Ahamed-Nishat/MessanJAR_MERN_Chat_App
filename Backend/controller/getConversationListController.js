const User = require('../models/userModel');

const getAllConversations = async (req, res) => {
    try {
        let users = await User.find().select('-password')
        //Filter out auth user own conversation
        let conversationsList = users.filter(conversation => conversation.id !== req.userId)

        if (users.length > 0) {
            res.status(200).json({
                data: conversationsList
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = getAllConversations