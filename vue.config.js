// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  devServer: {
    proxy: {
      "/apis": {
        target: "http://47.92.237.140:8090/", // target host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          "^/apis": "" // rewrite path
        }
      }
    }
  }
};
