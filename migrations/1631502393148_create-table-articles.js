/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('articles', {
    id: 'id',
    author: {
      type: 'TEXT',
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      type: 'TEXT',
    },
    created: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('articles');
};
