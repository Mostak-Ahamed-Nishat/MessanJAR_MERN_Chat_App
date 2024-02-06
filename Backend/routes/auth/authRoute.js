const router = require('express').Router()

const { authController } = require('../../controller/auth/authController')
const {
    userRegistrationController
} = require('../../controller/auth/userRegistrationController')


router.post('/user-register', userRegistrationController)
router.post('/login', authController)

module.exports = router