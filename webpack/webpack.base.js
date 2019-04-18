const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

/**
 * Environment Variables
 */

const environment = process.env.NODE_ENV;
const isDevelopment = environment === "development";
const isProduction = environment === "production";

/**
 * Webpack Config
 */

const rootPath = path.resolve("");
const buildPath = path.resolve("dist");

module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "source-map" : "none", // `source-map` shows the file and line number of an error
  entry: [
    "@babel/polyfill", // emulates ES2015 environment for browsers on runtime
    path.resolve("src", "src", "index.js")
  ],
  output: {
    filename: "dist/[name].bundle.js",
    path: buildPath
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/[name].[hash:8].css"
    }),
    new CleanWebpackPlugin(["dist"], {
      root: rootPath
    })
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            include: path.resolve("src"),
            resolve: {
              extensions: [".js"] // allows js file import without specifying the extension
            },
            use: {
              loader: "babel-loader"
            }
          },
          // prettier-ignore
          {
            test: /\.css$/,
            use: isDevelopment
              ? [
                { loader: "style-loader" },
                { loader: "css-loader", options: { importLoaders: 1, sourceMap: true } },
                { loader: "postcss-loader", options: { sourceMap: true } }
              ]
              : [
                { loader: MiniCssExtractPlugin.loader },
                { loader: "css-loader", options: { importLoaders: 1 } },
                { loader: "postcss-loader" }
              ]
          },
          {
            test: /\.(sass|scss)$/,
            use: [
              { loader: MiniCssExtractPlugin.loader },
              { loader: "css-loader", options: { importLoaders: 2 } },
              { loader: "postcss-loader" },
              { loader: "sass-loader" }
            ]
          },

          /**
           * Asset Rules
           */

          {
            test: /\.svg$/,
            loader: "svg-inline-loader"
          },

          /**
           * Everything Else (fall through)
           */

          {
            // prettier-ignore
            exclude: [/\.js$/,],
            use: {
              loader: "file-loader",
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          }
        ]
      }
    ]
  }
};
