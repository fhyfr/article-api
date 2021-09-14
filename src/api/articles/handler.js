const errorHandler = require('../../exceptions/ErrorHandler');

class ArticlesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postArticleHandler = this.postArticleHandler.bind(this);
    this.getArticleByAuthorHandler = this.getArticleByAuthorHandler.bind(this);
    this.getArticleByKeywordHandler = this.getArticleByKeywordHandler.bind(this);
    this.getArticleDetailsByIdHandler = this.getArticleDetailsByIdHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      this.validator.validatePostArticlePayload(request.payload);

      const { author, title, body } = request.payload;

      const articleId = await this.service.addNewArticle({ author, title, body });

      const response = h.response({
        status: 'success',
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

  async getArticleByAuthorHandler(request, h) {
    try {
      const { author } = request.params;

      const articles = await this.service.filterArticleByAuthor(author);

      return {
        status: 'success',
        data: {
          articles,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getArticleByKeywordHandler(request, h) {
    try {
      const { keyword } = request.query;

      const articles = await this.service.getArticleByKeyword(keyword);

      return {
        status: 'success',
        data: {
          articles,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getArticleDetailsByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const article = await this.service.getDetailsArticle(id);

      return {
        status: 'success',
        data: {
          article,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = ArticlesHandler;
