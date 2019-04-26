const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const replaceStyleLoaderWith = require('./replaceStyleLoaderWith');

const { baseConfig } = require('./webpack.base.config.js');

const prodConfig = merge.smart(
  replaceStyleLoaderWith(MiniCssExtractPlugin.loader)(/\.s[ac]ss$/, baseConfig),
  {
    mode: 'production',

    optimization: {
      minimize: false
    },

    output: {
      path: path.resolve(__dirname, '..', 'dist'),
      filename: 'bundle-[hash].js'
    },

    module: {
      rules: [
        {
          test: /\.(jpe?g|png)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                optipng: {
                  optimizationLevel: 7
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                mozjpeg: {
                  progressive: true,
                  quality: 80
                }
              }
            }
          ]
        }
      ]
    },

    devtool: false,

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles-[contenthash].css'
      }),
      new MinifyPlugin()
    ]
  }
);

module.exports = prodConfig;
