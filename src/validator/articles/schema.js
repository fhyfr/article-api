const Joi = require('joi');

const PostArticlePayloadSchema = Joi.object({
  author: Joi.string().required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports = { PostArticlePayloadSchema };
