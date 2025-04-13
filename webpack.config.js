// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/Program.fs.js",
  output: {
    path: path.join(__dirname, "./public"),
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
  },
};
