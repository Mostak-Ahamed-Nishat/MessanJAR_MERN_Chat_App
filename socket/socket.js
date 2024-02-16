const io = require('socket.io')(8000, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});


let users = []
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

const removeActiveUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
    return users
}

io.on('connection', (socket) => {
    console.log("New User connected");
    //Connect the socket
    socket.on("addUser", (userId, userInfo) => {
        //get the socketId from socket connection
        const socketId = socket.id
        //Get the authenticated user and set into the socket
        addUser(userId, socketId, userInfo)
        //Send the authenticated users to the client
        io.emit('getUser', users)
    });

    //Remove the inactive user from the active user list
    socket.on('disconnect', () => {
        removeActiveUser(socket.id)
        io.emit('getUser', users)
    })
});