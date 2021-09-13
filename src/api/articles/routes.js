const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/articles',
    handler: handler.postArticleHandler,
  },
  {
    method: 'GET',
    path: '/api/v1/articles',
    handler: handler.getArticleByIndexHandler,
  },
];

module.exports = routes;
