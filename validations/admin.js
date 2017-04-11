const Joi = require('joi')

module.exports.post = {

    name: Joi.string().required(),
    photo: Joi.string().required(),
    description: Joi.string().required(),
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
    cost: Joi.string().required()

};
