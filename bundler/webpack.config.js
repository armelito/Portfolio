// Init
const path = require('path')
const webpack = require('webpack')

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

// IS_DEV
const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

// Paths
const dirApp = path.join(__dirname, '../app')
const dirStyles = path.join(__dirname, '../styles')
const dirShared = path.join(__dirname, '../shared')
const dirNode = 'node_modules'

module.exports = {
  // Entry
  entry: [
    path.join(dirApp, 'index.js'),
    path.join(dirStyles, 'index.styl')
  ],
  // Resolve
  resolve: {
    modules: [
      dirApp,
      dirShared,
      dirStyles,
      dirNode
    ]
  },
  // Plugins
  plugins: [
    // IS_DEV ?
    new webpack.DefinePlugin({ IS_DEVELOPMENT }),
    // Copy folder
    new CopyWebpackPlugin
    ({
      patterns:
      [
        {
          from: path.resolve(__dirname, '../shared'),
          to: ''
        }
      ]
    }),
    // Rename css files
    new MiniCssExtractPlugin
    ({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // Minify images
    new ImageMinimizerPlugin
    ({
      minimizerOptions:
      {
        plugins:
        [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
        ],
      },
    })
  ],
  // Modules
  module:
  {
    rules:
    [
      // JS files
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      // Stylus files
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      // Images files
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name (file) {
                if (IS_DEVELOPMENT) {
                  return '[path][name].[ext]'
                }
                return '[hash].[ext]'
              },
              outputPath: 'assets/images/'
            }
          },
          // Minify images files
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: 'warning',
              minimizerOptions: {
                plugins: ['gifsicle'],
              },
            },
          },
        ],
      },
      // Font files
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/,
        use:
        [
          {
            loader: 'file-loader',
            //options: { outputPath: 'fonts/' }
          }
        ]
      },
      // Glsl files
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  },
  // Optimization
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
}
