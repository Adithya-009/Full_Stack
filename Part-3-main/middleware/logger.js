const morgan = require('morgan');

// Custom Morgan token to log POST request body
morgan.token('postData', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

const loggerMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms :postData');

module.exports = loggerMiddleware;
