const path = require('path');

module.exports = {
  /* 
    Definição do caminho do arquivo de entrada
  */
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    /* 
      Definição do diretorio do arquivo resultando do webpack
    */
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          { loader: 'file-loader' },
        ]
      },
    ],
  }
};