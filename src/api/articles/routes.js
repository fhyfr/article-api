const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/articles',
    handler: handler.postArticleHandler,
  },
  {
    method: 'GET',
    path: '/api/v1/articles/{author}',
    handler: handler.getArticleByAuthorHandler,
  },
  {
    method: 'GET',
    path: '/api/v1/articles',
    handler: handler.getArticleByKeywordHandler,
  },
  {
    method: 'GET',
    path: '/api/v1/articles/details/{id}',
    handler: handler.getArticleDetailsByIdHandler,
  },
];

module.exports = routes;
