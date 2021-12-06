module.exports = {
  publicPath: "/beyond-the-sky/",
  configureWebpack: {
    resolve: {
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".gql", ".graphql"]
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
        {
          test: /\.(md|markdown)$/,
          use: "markdown-image-loader"
        }
      ]
    }
  }
};
