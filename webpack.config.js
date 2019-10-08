const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env",
          {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        ],
        }

      },
      {
        test: /\.(scss|css)$/,
        loaders: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          { loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|ico)$/,
      loader: 'file-loader',
      options: {
        name: '/fonts/[name].[ext]',
        useRelativePath: true
   }
    },
  ]
},
resolve: { extensions: ["*", ".js", ".jsx"] },
output: {
  path: path.resolve("./dist/assets"),
  publicPath: "./assets/",
  filename: "bundle.js"
},
devServer: {
  contentBase: "./src/",
  port: 3000,
  publicPath: "/assets/",
  hotOnly: true
},
plugins: [
  new CopyWebpackPlugin([
    { from: path.resolve('src/assets'), to: path.resolve('dist/assets') },
  ])
]
};
