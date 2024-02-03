const User = require('../../models/userRegistrationModel');
const bcrypt = require('bcrypt');
const {
    userValidationSchema
} = require("../../validations/userRegistrationValidator");
require('dotenv').config()
const fs = require('fs');

var formidable = require("formidable");

const userRegister = async (req, res) => {

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

        //If any validation fails
        if (error) {
            error.details.map((err) => {
                validationErrors.push({
                    [err.path]: err.message
                })
            })

            return res.status(400).json({
                message: validationErrors
            })
        }

        //Check is the email exist in the database
        const emailIsExist = await User.findOne({
            email
        })

        //if the mail already exists
        if (emailIsExist) {
            validationErrors.push({
                isExist: 'Email is already exist'
            })
            return res.status(400).json({
                message: validationErrors
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
                () => {
                    return res.status(200).json({
                        message: "User created successfully"
                    })
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
                        message: "Server error with unlink image"
                    })
                })
            }
            return res.status(500).json({
                message: error.error
            })
        }

    })
}


module.exports = {
    userRegister
}