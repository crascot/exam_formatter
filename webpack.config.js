const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
 entry: "./src/index.tsx",
 output: {
  filename: "bundle.js",
  path: path.resolve(__dirname, "dist"),
 },
 mode: "development",
 devServer: {
  static: "./dist",
  hot: true,
  historyApiFallback: true,
 },
 module: {
  rules: [
   {
    test: /\.(ts|tsx)$/,
    use: "babel-loader",
    exclude: /node_modules/,
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
 ],
};
