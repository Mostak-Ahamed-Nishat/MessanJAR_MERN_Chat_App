const formidable = require('formidable');

const Message = require("../models/messagesModel");
const {
    imageUploader,
    deleteImage
} = require('../lib/imageUploader');



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
            return (message.senderId === authUserId.toString() && message.receiverId === friendConversationId.toString() || message.receiverId === authUserId.toString() && message.senderId === friendConversationId.toString())
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


const sendImageMessage = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log("Error parsing");
            return res.status(500).json({
                error: 'Error parsing form data'
            });
        }

        const {
            senderName,
            receiverId,
        } = fields;
        const senderId = req.userId;


        const {
            image
        } = files;

        const img = image[0];
        const senderUserName = senderName[0]
        const rcvrId = receiverId[0]


        try {
            if (img) {
                const path = __dirname + './../../Frontend/public/chats/';
                const data = await imageUploader(img, path, res);

                console.log(data);

                const insertToDB = await Message.create({
                    senderId,
                    receiverId: rcvrId,
                    message: {
                        image: data
                    },
                    senderName: senderUserName
                });

                const result = await insertToDB.save();

                if (result) {
                    res.status(200).json({
                        message: "Image send successfully",
                        data: data
                    });
                } else {
                    deleteImage(path, data, res);
                    throw new Error("Image send failed");
                }
            }
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });
};

module.exports = {
    getMessages,
    sendMessage,
    sendImageMessage
}