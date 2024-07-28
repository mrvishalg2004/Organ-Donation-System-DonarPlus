const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'development',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    fallback: {
      fs: false,
      crypto: false,
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      net: false,
      timers: require.resolve('timers-browserify'),
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      tls: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.ContextReplacementPlugin(
      /express[\/\\]/,
      (data) => {
        delete data.dependencies[0].critical;
        return data;
      }
    ),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'global.GENTLY': false,
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new Dotenv({
      path: './.env', // Path to your .env file
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist/public'),
    },
    compress: true,
    port: 8081,
    open: true,
  },
};


// const path = require('path');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
// const Dotenv = require('dotenv-webpack');

// module.exports = {
//   target: 'node',
//   externals: [nodeExternals()],
//   mode: 'development',
//   entry: path.resolve(__dirname, './src/main.js'),
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   resolve: {
//     extensions: ['.js', '.json'],
//     modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//     fallback: {
//       fs: false,
//       crypto: false,
//       stream: require.resolve('stream-browserify'),
//       http: require.resolve('stream-http'),
//       net: false,
//       timers: require.resolve('timers-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       querystring: require.resolve('querystring-es3'),
//       tls: false,
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//     ],
//   },
//   plugins: [
//     new webpack.IgnorePlugin({
//       resourceRegExp: /^\.\/locale$/,
//       contextRegExp: /moment$/,
//     }),
//     new webpack.ContextReplacementPlugin(
//       /express[\/\\]/,
//       (data) => {
//         delete data.dependencies[0].critical;
//         return data;
//       }
//     ),
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//     }),
//     new webpack.DefinePlugin({
//       'global.GENTLY': false,
//     }),
//     new webpack.ProvidePlugin({
//       Buffer: ['buffer', 'Buffer'],
//     }),
//     new Dotenv(),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'dist/public'),
//     },
//     compress: true,
//     port: 8081,
//     open: true,
//   },
// };
