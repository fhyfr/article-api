const Joi = require('joi');

const ArticlePayloadSchema = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports = { ArticlePayloadSchema };
