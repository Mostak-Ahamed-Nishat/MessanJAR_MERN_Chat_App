const Joi = require('joi');

const passwordSchema = Joi.string().min(8).required();

const userValidationSchema = Joi.object({
    userName: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    password: passwordSchema,
    confirmPassword: passwordSchema.valid(Joi.ref('password')).messages({
        'any.only': 'Password and confirm password do not match',
    }),
    
    image: Joi.any()
        .optional().custom((value, helpers) => {
            if (!value) {
                return value; // Null or undefined, validation passes
            }
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileExtension = value.originalFilename.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                return helpers.message('Invalid file type. Please upload a valid image (jpg, jpeg, png).');
            }
            return
        })
});

module.exports = {
    userValidationSchema
};