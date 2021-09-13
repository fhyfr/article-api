const errorHandler = require('../../exceptions/ErrorHandler');
const InvariantError = require('../../exceptions/InvariantError');

class ArticlesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postArticleHandler = this.postArticleHandler.bind(this);
    this.getArticleByIndexHandler = this.getArticleByIndexHandler.bind(this);
  }

  async postArticleHandler(request, h) {
    try {
      this.validator.validateArticlePayload(request.payload);

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

  async getArticleByIndexHandler(request, h) {
    try {
      const params = request.query;

      if (params.author && params.keyword) {
        throw new InvariantError('Bad Request, invalid query parameters');
      }

      if (params.keyword) {
        const { keyword } = request.query;

        const articles = await this.service.getArticleByKeyword(keyword);

        return {
          status: 'success',
          data: {
            articles,
          },
        };
      }

      if (params.author) {
        const { author } = request.query;

        const articles = await this.service.getArtilceByAuthor(author);

        return {
          status: 'success',
          data: {
            articles,
          },
        };
      }

      const articles = await this.service.getAllArticles();

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
}

module.exports = ArticlesHandler;
