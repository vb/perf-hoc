const webpack = require('webpack');

module.exports = {
  entry: './src/lcHOC.js',
  output: {
    libraryTarget: "commonjs2",
    path: __dirname +'/dist',
    filename: 'lcHOC.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  externals: {
    "react": "react"
  },
  node: {
    "Buffer": false
  }
}
