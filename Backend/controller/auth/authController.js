const {
    authValidationSchema
} = require("../../validations/authValidations")
const User = require('../../models/userRegistrationModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const authController = async (req, res, ) => {

    //Get the data from request body
    const {
        email,
        password
    } = req.body

    //Validations errors
    let validationErrors = []

    //check the validation error
    const {
        error,
        data
    } = authValidationSchema.validate({
        email,
        password
    }, {
        abortEarly: false, // Collect all errors, not just the first one
        errors: {
            wrap: {
                label: ''
            }
        }, // Specify how to format the errors
    })

    //If any validation fails send the error message to the client
    if (error) {
        if (error) {
            error.details.map((err) => {
                validationErrors.push({
                    [err.path]: err.message
                })
            })
            return res.status(401).send({
                error: validationErrors
            })
        }
    }


    try {
        //GEt the user by email 
        const user = await User.findOne({
            email
        })

        //IF user does not exist
        if (!user) {

            validationErrors.push({
                email: "User not found"
            })

            return res.status(401).json({
                error: validationErrors
            })
        }

        //If exist check the password
        if (user) {
            //Check the password
            const matchPassword = await bcrypt.compare(password, user.password);

            //If password incorrect
            if (!matchPassword) {

                validationErrors.push({
                    password: "Email or password Incorrect"
                })

                return res.status(403).json({
                    error: validationErrors
                })
            }

            //Generate a token
            let token = user.generateJWTAuthToken()

            //After generating token
            if (token) {
                //Generate expiring time for cookie
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

                const options = {
                    maxAge: 24 * 60 * 60 * 7 * 1000,
                    httpOnly: true,
                };

                res.status(200).cookie('authToken', token, options).header('X-Auth-Token', token).json({
                    message: "User Login successfully",
                    token
                })
            } else {
                throw ({
                    error: {
                        message: "Server error with generated token"
                    }
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }





}



module.exports = {
    authController
}