const authUserMiddleware = require("../middleware/authMiddleware")
const authRoute = require("./auth/authRoute")
const getAllConversationRoute = require("./conversationsRoute")


const routes = (app) => {
    app.use('/api/auth', authRoute)
    app.use('/api/messanjar',authUserMiddleware, getAllConversationRoute)
}

module.exports = routes