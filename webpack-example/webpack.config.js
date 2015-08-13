var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    page1: "./page1",
    page2: "./page2"
  },
  output: {
    path: path.join(__dirname, "js"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/thunderdome/webpack-example/js/"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', "common.js")
  ],
  resolve:
  {
    root: path.join(__dirname, 'js')
  }
}