const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dog.ceo',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
