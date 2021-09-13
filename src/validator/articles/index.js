const { ArticlePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ArticlesValidator = {
  validateArticlePayload: (payload) => {
    const validationResult = ArticlePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ArticlesValidator;
