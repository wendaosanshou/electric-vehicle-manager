// vue.config.js
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://123.206.17.49' : '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://47.92.237.140', // target host
        ws: true,
        changeOrigin: true, // needed for virtual hosted sites
        // pathRewrite: {
        //   "^/api": "/" // rewrite path
        // }
      },
    },
  },
};
