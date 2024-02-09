const {
    authTokenMiddleware
} = require("../middleware/authMiddleware")
const authRoute = require("./auth/authRoute")
const getAllConversationRoute = require("./conversationsRoute")


const routes = (app) => {
    app.use('/api/auth', authRoute)
    app.use('/api/messanjar', getAllConversationRoute)
    // app.use('/api/message')
}

module.exports = routes