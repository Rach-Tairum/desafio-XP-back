const Joi = require('joi');

const validationsRequired = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.email': '{{#label}} must be a valid email',
  }),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'field empty',
});

const validateInfoToken = (req, _res, next) => {
  const { error } = validationsRequired.validate(req.body, { abortEarly: false });

  if (!error) return next();

  const errorObj = { status: 400, message: req.body };
  throw errorObj;
};

module.exports = validateInfoToken;