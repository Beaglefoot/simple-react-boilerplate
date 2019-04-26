const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const projectRootDir = path.resolve(__dirname, '..');

const cssLoaderOptions = {
  modules: true,
  sourceMap: true,
  importLoaders: 1,
  localIdentName: '[name]__[local]--[hash:base64:5]',
  camelCase: true
};

const baseConfig = {
  mode: 'development',

  entry: [path.resolve(projectRootDir, 'src/index.jsx')],

  output: {
    path: path.resolve(projectRootDir, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: cssLoaderOptions
          },
          'sass-loader'
        ]
      },
      {
        test: /_worker\.js$/,
        loader: 'worker-loader'
      },
      {
        test: /\.(jpe?g|png)$/i,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/i,
        use: [
          'raw-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                plugins: [
                  { removeDimensions: true },
                  { removeViewBox: true },
                  { cleanupIDs: false }
                ]
              }
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      src: path.resolve(projectRootDir, 'src'),
      assets: path.resolve(projectRootDir, 'assets')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRootDir, 'src/index.html')
    }),
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = {
  baseConfig,
  projectRootDir,
  cssLoaderOptions
};
