const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
 entry: "./src/index.tsx",
 output: {
  filename: "bundle.js",
  path: path.resolve(__dirname, "dist"),
  publicPath: "/",
 },
 mode: "development",
 devServer: {
  static: "./dist",
  hot: true,
  historyApiFallback: {
   index: "/index.html",
  },
  open: true,
  port: process.env.DEV_SERVER_PORT || 8080,
 },
 module: {
  rules: [
   {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: {
     loader: "babel-loader",
     options: {
      plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(
       Boolean,
      ),
     },
    },
   },
   {
    test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"],
   },
   {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
   },
   {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
   },
  ],
 },
 resolve: {
  extensions: [".ts", ".tsx", ".js", ".jsx"],
 },
 plugins: [
  new Dotenv({
   path: `.env.${process.env.NODE_ENV}`,
  }),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
   template: "./public/index.html",
   favicon: "./public/favicon.ico",
  }),
  new CopyWebpackPlugin({
   patterns: [
    { from: "public", to: "", globOptions: { ignore: ["**/index.html"] } },
   ],
  }),
  isDevelopment && new ReactRefreshWebpackPlugin(),
 ].filter(Boolean),
};
