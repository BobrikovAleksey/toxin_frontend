const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'main'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: [ '.js', '.jsx', '.css', '.scss', '.sass' ],
    alias: {
      App: path.resolve(__dirname, 'src', 'app'),
      Components: path.resolve(__dirname, 'src', 'app', 'components'),
      Fonts: path.resolve(__dirname, 'src', 'assets', 'fonts'),
      Libs: path.resolve(__dirname, 'src', 'app', 'libs'),
      Styles: path.resolve(__dirname, 'src', 'app', 'styles'),
      Store: path.resolve(__dirname, 'src', 'store'),
      Views: path.resolve(__dirname, 'src', 'app', 'views'),
    },
  },

  module: {
    rules: [
      // scripts
      {
        test: /\.js[x]$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: [ '@babel/preset-env' ] },
        },
      },
      // styles
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // fonts and svg
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: './assets' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Toxin: Выбор номеров отеля',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
};
