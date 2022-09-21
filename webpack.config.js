const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

module.exports = {
  entry: './src/index.js', // Dẫn tới file index.js ta đã tạo
  output: {
    path: path.join(__dirname, '/build'), // Thư mục chứa file được build ra
    filename: '[name][hash:6].js', // Tên file được build ra - tránh trình duyệt cache lại file js
    clean: true, // cách mới clean file rác của webpack
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  // Chứa các plugins sẽ cài đặt trong tương lai
  plugins: [
    // new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new ESLintPlugin(),
    new InterpolateHtmlPlugin({ PUBLIC_URL: 'static' })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json'],
  },
  devServer: {
    open: true
  }
};
