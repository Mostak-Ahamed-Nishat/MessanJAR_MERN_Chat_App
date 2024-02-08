const User = require('../models/userModel');


const getAllConversations = async (req, res) => {
    try {
        let users = await User.find().select('-password')
        if (users.length > 0) {
            res.status(200).json({
                data: users
            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = getAllConversations