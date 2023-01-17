const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.dmpush.kr",
      changeOrigin: true,
    })
  );
};
