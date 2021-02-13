const path = require(`path`); // - встроенный в node.module module делает из атносительного
// пути в абсолютный

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`) // .join() склеивает несколько путей, где
    // __dirname глобальная переменная содержащая полный путь до корневой папки где находиться
    // сам файл webpack.config.js и склеим с путем public для которого все и собераем.
    // publicPath: `public`, - для работы в режиме development
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: true,
    inline: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }, {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },
  devtool: `source-map`,
};
