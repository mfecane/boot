'use strict'

const config = require('./webpack.config.js')
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

module.exports = Object.assign(config, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  optimization: optimization,
})
