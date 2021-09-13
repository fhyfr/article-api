const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

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
}

module.exports = ArticlesService;
