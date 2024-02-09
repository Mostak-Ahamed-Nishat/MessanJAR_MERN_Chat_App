const User = require("../models/userModel");
const jwt = require('jsonwebtoken')


module.exports.authTokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    try {
        const user = await jwt.verify(token, process.env.jsonPrivateKey)
        const authUser = await User.findById(user._id).select('-password');
        req.userId = authUser._id
        
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized - Invalid Token'
        });
    }
    next()
}