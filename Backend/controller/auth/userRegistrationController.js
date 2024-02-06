const User = require('../../models/userRegistrationModel');
const bcrypt = require('bcrypt');
const {
    userValidationSchema
} = require("../../validations/userRegistrationValidator");
require('dotenv').config()
const fs = require('fs');
const jwt = require('jsonwebtoken');

var formidable = require("formidable");

const userRegistrationController = async (req, res) => {

    //Create a formidable instance 
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {

        if (err) {
            return res.status(500).json({
                error: 'Error parsing form data'
            });
        }

        //get the data from the field
        const userName = fields.userName[0]
        const email = fields.email[0]
        const password = fields.password[0]
        const confirmPassword = fields.confirmPassword[0]
        const image = files.image ? files.image[0] : ""


        //Check the validation
        const {
            error,
            value
        } = userValidationSchema.validate({
            userName,
            email,
            password,
            confirmPassword,
            image
        }, {
            abortEarly: false, // Collect all errors, not just the first one
            errors: {
                wrap: {
                    label: ''
                }
            }, // Specify how to format the errors
        })


        const validationErrors = []

        //Check is the email exist in the database
        const emailIsExist = await User.findOne({
            email
        })

        //if the mail already exists
        if (emailIsExist) {
            let emailExistError = {
                email: "Email already exists"
            }
            validationErrors.push(emailExistError)

            return res.status(401).send({
                error: validationErrors
            })
        }

        //If any validation fails
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


        try {
            //Hash the password
            const hashPassword = await bcrypt.hash(password, 10)

            //file upload directory
            form.uploadDir = '../../../Frontend/public/usersImg'

            // If image available
            let uploadImagePath
            if (image) {
                //Rename the default image with new one
                const imageNewName = Date.now() + '-' + Math.random() * 3642 + '-' + image.originalFilename

                image.originalFilename = imageNewName
                uploadImagePath = __dirname + './../../../Frontend/public/usersImg/' + `${image.originalFilename}`
                //Upload the image into directory
                fs.copyFile(image.filepath, uploadImagePath, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message
                        })
                    }
                })
            }

            // save the data into database
            const data = new User({
                userName,
                email,
                password: hashPassword,
                image: uploadImagePath
            })

            await data.save().then(
                (data) => {

                    //Get the generated token from the userRegistration Model 
                    let token = data.generateJWTAuthToken()

                    if (token) {

                        //Generate expiring time for cookie
                        const expirationDate = new Date();
                        expirationDate.setTime(expirationDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

                        const options = {
                            maxAge: 24 * 60 * 60 * 7 * 1000,
                            httpOnly: true,
                        };

                        res.status(200).cookie('authToken', token, options).header('X-Auth-Token', token).json({
                            message: "User created successfully",
                            token
                        })

                    } else {
                        throw ({
                            error: "Server error with token."
                        })
                    }
                }
            ).catch(err => {
                throw ({
                    image: uploadImagePath,
                    error: err.message
                })
            })
        } catch (error) {
            if (error.image) {
                fs.unlink(error.image, (err) => {
                    if (err) return res.status(500).json({
                        error: "Server error with unlink image"
                    })
                })
            }
            return res.status(500).json({
                error: error.error
            })
        }
    })
}


module.exports = {
    userRegistrationController
}