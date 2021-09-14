const { PostArticlePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ArticlesValidator = {
  validatePostArticlePayload: (payload) => {
    const validationResult = PostArticlePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ArticlesValidator;
