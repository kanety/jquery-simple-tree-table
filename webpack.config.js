var webpack = require("webpack");

module.exports = {
  entry: ["./src/jquery-simple-tree-table.js"],

  output: {
    path: __dirname + "/dist",
    filename: "jquery-simple-tree-table.js"
  },

  resolve: {
    modules: [
      __dirname + "/src",
      "node_modules"
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }, {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      }
    ]
  },

  watchOptions: {
    poll: 1000
  }
};

