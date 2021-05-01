const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

const common = require("./webpack.common.js");
const { GOOGLE_MAPS_API_BASE_URL, PROXY_BASE_PATH } = require("./constants");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\//,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      GOOGLE_MAPS_API_BASE_URL: JSON.stringify(PROXY_BASE_PATH),
    }),
  ],
  devServer: {
    contentBase: "./",
    hot: true,
    proxy: {
      [`${PROXY_BASE_PATH}/**`]: {
        target: GOOGLE_MAPS_API_BASE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          [`^${PROXY_BASE_PATH}`]: "/",
        },
      },
    },
  },
});
