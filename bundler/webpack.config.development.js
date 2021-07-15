const { merge } = require('webpack-merge')
const path = require('path')

const config = require('./webpack.config')

module.exports = merge(
  config,
  {
    // Mode
    mode: 'development',
    // Devtool
    devtool: 'inline-source-map',
    // Devserver
    devServer:
    {
      host: '0.0.0.0',
      contentBase: './public',
      open: true,
      https: false,
      useLocalIp: true,
      writeToDisk: true
    },
    // Output path
    output:
    {
      path: path.join(__dirname, '../public')
    },
  }
)
