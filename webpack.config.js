const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// extensions
const JS = '.js';
const JSX = '.jsx';
const CSS = '.css';
const SCSS = '.scss';
const SASS = '.sass';
const HTML = '.html';

// loaders
const BABEL_LOADER = 'babel-loader';
const STYLE_LOADER = 'style-loader';
const CSS_LOADER = 'css-loader';
const POSTCSS_LOADER = 'postcss-loader';
const SASS_LOADER = 'sass-loader';

// paths
const SRC = path.resolve(__dirname, 'src');
const APP = path.resolve(SRC, 'app');
const ASSETS = path.resolve(SRC, 'assets');
const COMPONENTS = path.resolve(APP, 'components');
const DIST = path.resolve(__dirname, 'dist');
const FONTS = path.resolve(ASSETS, 'fonts');
const LIBS = path.resolve(APP, 'libs');
const STYLES = path.resolve(APP, 'styles');
const STORE = path.resolve(APP, 'store');
const VIEWS = path.resolve(APP, 'views');

// patterns
const FONTS_EXTENSION_PATTERN = /\.(woff(2)?|eot|ttf|otf|svg)$/i;
const IMAGE_EXTENSION_PATTERN = /\.(?:ico|gif|png|jpg|jpeg)$/i;
const SCRIPT_EXTENSION_PATTERN = /\.js[x]$/i;
const STYLE_EXTENSION_PATTERN = /\.(s[ac]ss|css)$/i;

module.exports = {
  entry: {
    main: APP,
  },

  output: {
    path: DIST,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: [ JS, JSX, CSS, SCSS, SASS, HTML ],
    alias: { APP, COMPONENTS, FONTS, LIBS, STYLES, STORE, VIEWS },
  },

  module: {
    rules: [
      // scripts
      {
        test: SCRIPT_EXTENSION_PATTERN,
        exclude: /node_modules/,
        use: {
          loader: BABEL_LOADER,
          options: {
            presets: [ '@babel/preset-env' ],
          },
        },
      },
      // styles
      {
        test: STYLE_EXTENSION_PATTERN,
        use: [ STYLE_LOADER, CSS_LOADER, POSTCSS_LOADER, SASS_LOADER ],
      },
      // images
      {
        test: IMAGE_EXTENSION_PATTERN,
        type: 'asset/resource',
      },
      // fonts and svg
      {
        test: FONTS_EXTENSION_PATTERN,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/assets',
          to: './assets',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Toxin: Выбор номеров отеля',
      template: SRC,
    }),
    new CleanWebpackPlugin(),
  ],
};
