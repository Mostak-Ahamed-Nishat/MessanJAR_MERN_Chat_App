const Message = require("../models/messagesModel")



const sendMessage = async (req, res) => {
    const {
        senderId,
        receiverId,
        message,
        senderName
    } = req.body

    const userId = req.userId

    if (userId.toString() === senderId.toString()) {
        try {
            const insertMessageToDb = await Message.create({
                senderId,
                receiverId,
                message: {
                    text: message,
                    image: ""
                },
                senderName
            })

            const result = await insertMessageToDb.save()

            if (result) {
                res.status(200).json({
                    success: true,
                    data: insertMessageToDb
                })
            } else {
                throw (new Error(`Couldn't insert message`))
            }


        } catch (error) {
            res.status(500).json({
                error: error.message
            })
        }
    }



}

const getMessages = async (req, res) => {
    const friendConversationId = req.params.id
    const authUserId = req.userId

    try {
        const data = await Message.find({})
        const messages = data.filter(message => {
            return message.senderId === authUserId.toString() && message.receiverId === friendConversationId.toString()
        })
        res.status(200).json({
            data: messages
        })
    } catch (error) {
        res.status(500).json({
            data: error.message
        })
    }


}

module.exports = {
    getMessages,
    sendMessage
}