const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CONFIG = {
  distPath: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: './src/index',
  output: {
    path: CONFIG.distPath,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: CONFIG.distPath
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyPlugin([{ from: 'public' }]),
    new ExtractTextPlugin('styles.css')
  ]
};
