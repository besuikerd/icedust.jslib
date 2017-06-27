var path = require('path');
var webpack = require('webpack');

var SOURCE_DIR = process.env.SOURCE_DIR;
if(SOURCE_DIR === undefined){
  console.warn('SOURCE_DIR environment variable is not set');
  SOURCE_DIR = 'src/main/js';
}

module.exports = {

  entry: 'index',
  output: {
    path: path.join(__dirname, '/target/generated-sources/js/icedust.jslib'),
    filename: 'runtime.js'
  },
  resolve: {
    modules: [
      "node_modules",
      path.join(__dirname, SOURCE_DIR)
    ]
  },
  module: {
    rules: [
      {
        test: require.resolve(path.join(__dirname, SOURCE_DIR, 'index')),
        use: {
          loader: 'expose-loader',
          options: 'Runtime'
        }
      }
    ]
  }
};