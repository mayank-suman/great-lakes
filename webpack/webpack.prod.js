const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { NetlifyPlugin } = require("netlify-webpack-plugin");

const common = require("./webpack.common.js");
const { GOOGLE_MAPS_API_BASE_URL } = require("./constants");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.EnvironmentPlugin(["GOOGLE_MAPS_PLACES_API_KEY"]),
    new webpack.DefinePlugin({
      GOOGLE_MAPS_API_BASE_URL: JSON.stringify(GOOGLE_MAPS_API_BASE_URL),
    }),
    new NetlifyPlugin({
      headers: {
        "index.html": {
          "Access-Control-Allow-Origin": "https://greatlakes.mayanksuman.dev",
        },
      },
    }),
  ],
});