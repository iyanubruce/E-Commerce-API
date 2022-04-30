const joi = require('joi');

const itemValidation = (item) => {
    const schema = joi.object({
        name: joi.string().min(2).max(50).required(),
        category: joi.string().min(2).max(50).required(),
        price: joi.number().required(),
        description: joi.string().min(2).max(255),
    }).unknown();

    return schema.validate(item)
}
module.exports = itemValidation