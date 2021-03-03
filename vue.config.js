const path = require("path");

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      extensions: ["*", ".vue", ".mjs", ".js", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
