const errorHandler = require('../../exceptions/ErrorHandler');

class ArticlesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postArticleHandler = this.postArticleHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      this.validator.validateArticlePayload(request.payload);

      const { author, title, body } = request.payload;

      const articleId = await this.service.addNewArticle({ author, title, body });

      const response = h.response({
        message: 'Article successfully created',
        data: {
          articleId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = ArticlesHandler;
