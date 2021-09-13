require('dotenv').config();
const Hapi = require('@hapi/hapi');

// articles
const articles = require('./api/articles');
const ArticlesService = require('./services/postgres/ArticlesService');
const ArtilcesValidator = require('./validator/articles');

const init = async () => {
  const articlesService = new ArticlesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: articles,
      options: {
        service: articlesService,
        validator: ArtilcesValidator,
      },
    },
  ]);

  // main page
  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 200,
      message: 'OK, server up!',
    }),
  });

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
