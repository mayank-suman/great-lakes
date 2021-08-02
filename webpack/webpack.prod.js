const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./webpack.common.js");
const { GOOGLE_MAPS_API_BASE_URL, PROXY_BASE_PATH } = require("./constants");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.EnvironmentPlugin({ GOOGLE_MAPS_PLACES_API_KEY: "" }),
    new NetlifyPlugin({
      redirects: [
        {
          from: `${PROXY_BASE_PATH}/*`,
          to: `${GOOGLE_MAPS_API_BASE_URL}/:splat`,
          status: 200,
          force: true, // needed for url rewriting
        },
      ],
    }),
    // This is done copy all files from public to build folder except html files
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: "public",
        },
      ],
    }),
  ],
});
