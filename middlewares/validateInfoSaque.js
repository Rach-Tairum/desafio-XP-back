const Joi = require('joi');

const validationsRequired = Joi.object({
  valorSaque: Joi.number().required(),
}).messages({
  'any.required': '{{#label}} é requerido',
  'string.empty': 'valor vazio',
});

const validateInfoSaque = (req, _res, next) => {
  const { error } = validationsRequired.validate(req.body, { abortEarly: false });

  if (!error) return next();
  
  const errorObj = { status: 400, message: error.message };
  throw errorObj;
};

module.exports = validateInfoSaque;