const ClientError = require('./ClientError');

// bundle error handLer
const errorHandler = (error, h) => {
  if (error instanceof ClientError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }

  // server error
  const response = h.response({
    status: 'error',
    message: 'Internal server error',
  });
  response.code(500);
  return response;
};

module.exports = errorHandler;
