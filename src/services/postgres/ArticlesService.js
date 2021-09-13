const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ArticlesService {
  constructor() {
    this.pool = new Pool();
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

    return result.rows[0].id;
  }

  async getAllArticles() {
    const result = await this.pool.query('SELECT author, title, body FROM articles');

    return result.rows;
  }

  async getArtilceByAuthor(author) {
    const query = {
      text: 'SELECT author, title, body FROM articles WHERE author LIKE $1',
      values: [`%${author}%`],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Author not found');
    }

    return result.rows;
  }

  async getArticleByTitleAndBody(title, body) {
    if (title && body) {
      const query = {
        text: 'SELECT author, title, body FROM articles WHERE title LIKE $1 AND body LIKE $2',
        values: [`%${title}%`, `%${body}%`],
      };

      const result = await this.pool.query(query);

      if (!result.rowCount) {
        throw new NotFoundError('Article not found');
      }

      return result.rows;
    }

    const query = {
      text: 'SELECT author, title, body FROM articles WHERE title LIKE $1 OR body LIKE $2',
      values: [`%${title}%`, `%${body}%`],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Article not found');
    }

    return result.rows;
  }
}

module.exports = ArticlesService;
