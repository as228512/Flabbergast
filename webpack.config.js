const path = require("path");

// production development

module.exports = {
  mode: "development",
  context: __dirname,
  entry: "./lib/canvas.js",
  output: {
    filename: "./lib/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  devtool: "source-map"
};
