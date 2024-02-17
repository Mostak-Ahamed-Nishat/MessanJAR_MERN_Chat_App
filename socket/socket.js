const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});

//Active user Array
let users = []
//If any user connect set to the users array list
const addUser = (userId, socketId, userInfo) => {
    const checkUser = users.some(user => user.userId === userId)
    if (!checkUser) {
        users.push({
            userId,
            socketId,
            userInfo
        })
    }
}

//If any user disconnect remove from the users array list
const removeActiveUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
    return users
}


//Find the user from the active user list
const checkFriend = (receiverId) => {

    let user = users.filter(user => user.userId == receiverId)
    return user
}



io.on('connection', (socket) => {
    // Handle connection errors
    socket.on('error', (error) => {
        console.error('Socket connection error:', error);
    });

    //Connect the socket
    socket.on("addUser", (userId, userInfo) => {
        //get the socketId from socket connection
        const socketId = socket.id
        //Get the authenticated user and set into the socket
        addUser(userId, socketId, userInfo)
        //Send the authenticated users to the client
        io.emit('getUser', users)
    });


    //Send realtime message
    socket.on('sendMessage', (data) => {

        let receiverId = data.receiverId
        let isActiveUser = checkFriend(receiverId)

        console.log("***Active user***");
        const socketId = isActiveUser[0].socketId
        console.log(socketId);

        if (isActiveUser && isActiveUser.length > 0) {
            // console.log("Inactive user sending message");
            //Get the user socket_id and emit a function 
            socket.to(socketId).emit('getMessage', {
                senderId: data.senderId,
                senderName: data.senderName,
                receiverId: data.receiverId,
                createdAt: data.time,
                message: {
                    text: data.message.text,
                    image: data.message.image
                },
            })
        }

    })

    //Remove the inactive user from the active user list
    socket.on('disconnect', () => {
        console.log("********Socket disconnected**********");
        console.log(socket.id);
        const updatedUsers = removeActiveUser(socket.id);

        // Only emit if the users array has changed
        if (JSON.stringify(updatedUsers) !== JSON.stringify(users)) {
            users = updatedUsers;
            io.emit('getUser', users);
        }
    });

});