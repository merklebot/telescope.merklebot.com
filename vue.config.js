const childProcess = require("child_process")
const webpack = require("webpack")

let lastCommitHash = ""

try {
  lastCommitHash = childProcess
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim()
} catch (e) {
  console.error(e)
}

module.exports = {
  publicPath: "",
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
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          VUE_APP_COMMIT_HASH: JSON.stringify(lastCommitHash),
        }
      }),
    ],
  }
};
