const Joi = require('joi')

module.exports.post = {

    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    photo: Joi.string().optional(),
    phone: Joi.string().required(),
    street_address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipcode: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
    
};
