const { merge } = require("webpack-merge");
const webpack = require("webpack");

const common = require("./webpack.common.js");
const { GOOGLE_MAPS_API_BASE_URL } = require("./constants");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      GOOGLE_MAPS_API_BASE_URL: JSON.stringify(GOOGLE_MAPS_API_BASE_URL),
    }),
  ],
});
