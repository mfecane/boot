'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const root = path.resolve(__dirname)

var rules = []

rules.push({
  test: /\.(js|ts|tsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader'],
})

rules.push({
  test: /\.html$/i,
  use: {
    loader: 'html-loader',
  },
})

rules.push({
  test: /\.(scss|css)$/,
  exclude: /\.module\.scss$/i,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { sourceMap: true },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            require('autoprefixer'),
            require('css-mqpacker'),
            require('cssnano')({
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            }),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: true },
    },
  ],
})

rules.push({
  test: /\.module\.(scss|css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
        modules: {
          mode: 'local',
          localIdentName: '[local]--[hash:base64:5]',
          // localsConvention: "camelCase"
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [
            require('autoprefixer'),
            require('css-mqpacker'),
            require('cssnano')({
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            }),
          ],
        },
      },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: true },
    },
  ],
})

rules.push({
  test: /\.(jpe?g|png|gif|svg|glb)$/i,
  type: 'asset/resource',
})

var plugins = []

plugins.push(
  new HtmlWebpackPlugin({
    template: path.resolve(root, 'src/templates/index.html'),
  })
)

plugins.push(new MiniCssExtractPlugin())

plugins.push(new CleanWebpackPlugin())

plugins.push(
  new CopyPlugin({
    patterns: ['assets/*.glb', 'assets/*.exr'],
  })
)

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', 'src'],
    alias: {
      js: path.resolve(__dirname, 'src/js'),
      css: path.resolve(__dirname, 'src/css'),
      templates: path.resolve(__dirname, 'src/templates'),
      assets: path.resolve(__dirname, 'assets'),
    },
  },
  devtool: 'source-map',
  plugins: plugins,
}
