const joi = require('joi');

const loginValidation = (user) => {
    const schema = joi.object({
        email: joi.string().min(2).max(255).required().email(),
        password: joi.string().min(2).max(255).required(),
      }).unknown();    
    return schema.validate(user)
  }

const userValidation = (user) => {
    const schema = joi.object({
        firstname: joi.string().min(2).max(50).required(),
        lastname: joi.string().min(8).max(50).required(),
        email: joi.string().min(6).max(255).required().email(),
        password: joi.string().min(8).required(),
        confirmpassword: joi.string().required.valid(joi.ref('password'))
    }).unknown();
    return schema.validate(user);
}

module.exports = {loginValidation, userValidation};