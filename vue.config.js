module.exports = {
  devServer: {
    open: false,
    host: "localhost",
    port: 8080,
    https: false,
    proxy: {
      "/test": {
        target: "http://api.vikingship.xyz/api",
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/test": ""
        }
      }
    }
  }
};
