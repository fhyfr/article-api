const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class ArticlesService {
  constructor(cacheService) {
    this.pool = new Pool();
    this.cacheService = cacheService;
  }

  async addNewArticle({
    author, title, body,
  }) {
    const query = {
      text: 'INSERT INTO articles(author, title, body) VALUES($1, $2, $3) RETURNING id, author, title, body, created',
      values: [author, title, body],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Failed insert article');
    }

    // cache article to redis
    const articleId = result.rows[0].id;
    await this.cacheService.set(`articles:${articleId}`, JSON.stringify(result.rows[0]));

    return result.rows[0].id;
  }

  async filterArticleByAuthor(author) {
    const query = {
      text: 'SELECT id, author, title FROM articles WHERE author = $1 ORDER BY created DESC',
      values: [author],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Article Not Found');
    }

    return result.rows;
  }

  async getArticleByKeyword(keyword) {
    if (!keyword) {
      throw new InvariantError('Bad Request, invalid query parameters');
    }

    const query = {
      text: 'SELECT id, title, author FROM articles WHERE title LIKE $1 OR body LIKE $1 ORDER BY created DESC',
      values: [`%${keyword}%`],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Article Not Found');
    }

    return result.rows;
  }

  async getDetailsArticle(id) {
    if (!id) {
      throw new InvariantError('Bad Request, invalid query parameters');
    }

    try {
      // get data from redis if exist
      const result = await this.cacheService.get(`articles:${id}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: 'SELECT * FROM articles WHERE id = $1',
        values: [id],
      };

      const result = await this.pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Article Not Found');
      }

      const article = result.rows.map(mapDBToModel)[0];

      // cache data to redis
      await this.cacheService.set(`articles:${id}`, JSON.stringify(article));

      return article;
    }
  }
}

module.exports = ArticlesService;
