const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ArticlesService {
  constructor(cacheService) {
    this.pool = new Pool();
    this.cacheService = cacheService;
  }

  async addNewArticle({
    author, title, body,
  }) {
    const query = {
      text: 'INSERT INTO articles(author, title, body) VALUES($1, $2, $3) RETURNING id',
      values: [author, title, body],
    };
    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Failed insert article');
    }

    await this.cacheService.delete('articles');

    return result.rows[0].id;
  }

  async getAllArticles() {
    try {
      const result = await this.cacheService.get('articles');
      return JSON.parse(result);
    } catch (error) {
      const result = await this.pool.query('SELECT author, title, body, created AS created_at FROM articles ORDER BY created DESC');

      await this.cacheService.set('articles', JSON.stringify(result.rows));

      return result.rows;
    }
  }

  async getArtilceByAuthor(author) {
    try {
      const result = await this.cacheService.get(`articles:author-${author}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: 'SELECT author, title, body FROM articles WHERE author LIKE $1 ORDER BY created DESC',
        values: [`%${author}%`],
      };

      const result = await this.pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Author not found');
      }

      await this.cacheService.set(`articles:author-${author}`, JSON.stringify(result.rows));

      return result.rows;
    }
  }

  async getArticleByKeyword(keyword) {
    try {
      const result = await this.cacheService.get(`articles:keyword-${keyword}`);
      return JSON.parse(result);
    } catch (error) {
      const query = {
        text: 'SELECT author, title, body, created AS created_at FROM articles WHERE title LIKE $1 OR body LIKE $1 ORDER BY created DESC',
        values: [`%${keyword}%`],
      };

      const result = await this.pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Article not found');
      }

      await this.cacheService.set(`articles:keyword-${keyword}`, JSON.stringify(result.rows));

      return result.rows;
    }
  }
}

module.exports = ArticlesService;
