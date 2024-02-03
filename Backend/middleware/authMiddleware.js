const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');

    if (!token) return res.status(401).json({
        message: "Access denied! token is required",
    })

    try {
        // verify token
        const decodedToken = jwt.verify(token, process.env.jsonPrivateKey)
        //Get the payload and set to the request object
        req.user = decodedToken
        //pass to the next middleware
        next()
    } catch (error) {
        return res.status(403).json({
            message: "Access denied! Invalid token",
        })
    }
}