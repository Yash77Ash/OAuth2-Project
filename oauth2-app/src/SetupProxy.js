const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user/profile', // API endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8080', // Spring Boot backend
      changeOrigin: true,
      secure: false, // if using HTTP, set this to false
    })
  );

  app.use(
    '/current-user', // API endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8081', // Spring Boot backend
      changeOrigin: true,
      secure: false, // if using HTTP, set this to false
    })
  );
};
