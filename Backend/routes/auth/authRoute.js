const router = require('express').Router()

const {
    userRegistrationController
} = require('../../controller/auth/userRegistrationController')

//Multer
const upload = require('../../middleware/multerConfig')

router.post('/user-register', userRegistrationController)

module.exports = router