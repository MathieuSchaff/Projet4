const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./starterOnly/modal.js"
  },
  output: {
    filename: "./dist/bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};