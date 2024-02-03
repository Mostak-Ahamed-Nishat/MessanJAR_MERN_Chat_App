const router = require('express').Router()

const {
    userRegister
} = require('../../controller/auth/authController')

//Multer
const upload = require('../../middleware/multerConfig')

router.post('/user-register', userRegister)

module.exports = router