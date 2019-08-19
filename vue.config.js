// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "http://123.206.17.49" : "/",
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.92.237.140", // target host
        ws: true,
        changeOrigin: true // needed for virtual hosted sites
        // pathRewrite: {
        //   "^/api": "/" // rewrite path
        // }
      }
    }
  }
};
