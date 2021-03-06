const jsConfig = require("./jsconfig.json");

module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: [jsConfig.compilerOptions.baseUrl],
        alias: jsConfig.paths,
      },
    ],
    "@babel/plugin-transform-runtime",
  ],
};
