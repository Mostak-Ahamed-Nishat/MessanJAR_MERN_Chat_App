const Joi = require('joi');

const authValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    authValidationSchema
};