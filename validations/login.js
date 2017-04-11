const Joi = require('joi')

module.exports.post = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
};
