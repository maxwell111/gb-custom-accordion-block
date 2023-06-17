const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  function isDevelopment() {
    return argv.mode === "development";
  }
  return {
    entry: {
      editor: path.resolve(__dirname, "src/editor.js"),
      script: path.resolve(__dirname, "src/script.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "./js/[name].min.js",
      pathinfo: false,
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        chunkFilename: "[id].min.css",
        filename: "./css/[name].min.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: ["@babel/plugin-proposal-class-properties"],
                presets: [
                  "@babel/preset-env",
                  [
                    "@babel/preset-react",
                    {
                      pragma: "wp.element.createElement",
                      pragmaFrag: "wp.element.Fragment",
                      development: isDevelopment(),
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    externals: {
      "@wordpress/blocks": ["wp", "blocks"],
      "@wordpress/block-editor": ["wp", "blockEditor"],
      "@wordpress/components": ["wp", "components"],
      "@wordpress/element": ["wp", "element"],
    },
  };
};
