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

io.on('connection', (socket) => {
    console.log("New User connected to ");
    //Connect the socket
    socket.on("addUser", (userId, userInfo) => {
        //get the socketId from socket connection
        const socketId = socket.id
        //Get the authenticated user and set into the socket
        addUser(userId, socketId, userInfo)
        //Send the authenticated users to the client
        io.emit('getUser', users)
    });
});