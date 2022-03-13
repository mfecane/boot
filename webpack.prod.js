'use strict'

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const optimization = {
  minimizer: [
    '...',
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: 'auto',
          },
        },
      },
    }),
  ],
}

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  optimization: optimization,
})
