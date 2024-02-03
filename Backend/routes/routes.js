const authRoute = require("./auth/authRoute")


const routes = (app) => {
    app.use('/api/auth', authRoute)
}

module.exports = routes