const routes = (handler) => [
  {
    method: 'POST',
    path: '/api/v1/articles',
    handler: handler.postArticleHandler,
  },
];

module.exports = routes;
