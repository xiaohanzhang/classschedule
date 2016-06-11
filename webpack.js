var _ = require('lodash')
  , path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require("extract-text-webpack-plugin")
  , projectRoot = path.resolve(__dirname)
  , appRoot = path.resolve(projectRoot, 'app')
  , devtool = '#eval-cheap-module-source-map'
  , debug = true
;

switch (process.env.NODE_ENV) {
  case 'production':
    devtool = '#source-map';
    debug = false;
    break;
  case 'development':
    break;
}

var config = {
  context: appRoot,
  entry: {
    app: path.join(appRoot, 'index.js'),
  },
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name].bundle.js',
  },
  externals: {
    lodash: '_',
    redux: false,
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: "babel-loader",
      query: {
        presets: ['es2015', 'react', 'stage-2'],
        cacheDirectory: true,
      },
      exclude: [/(node_modules|bower_components)/,], 
      include: [appRoot,],
    }, {
      test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=image/jpg&prefix=dist/"
    }, {
      test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=image/jpg&prefix=dist/"
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=application/font-woff&prefix=dist/"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=application/font-woff&prefix=dist/"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=application/octet-stream&prefix=dist/"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 
        "url?limit=1000&minetype=application/vnd.ms-fontobject&prefix=dist/"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=1000&minetype=image/svg+xml&prefix=dist/"
    }, {
      test: /\.css$/, 
      loader: ExtractTextPlugin.extract("style-loader", "css-loader"),
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        "style-loader", "css-loader!less-loader"),
    },],
    noParse: [
    ]
  },
  resolve: {
    root: [appRoot],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash',
    }),
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', filename: 'vendor.bundle.js',
      chunks: ['app'],
      minChunks: function(module, count) {
        return module.resource && module.resource.indexOf(appRoot) === -1;
      }
    }),
  ],
  debug: debug,
  devtool: devtool,
};

var compiler = webpack(config);

if (process.env.NODE_ENV === 'development') {
  compiler.watch({
    aggregateTimeout: 300,
    poll: 1000,
  }, handleError);
} else {
  compiler.run(handleError);
}

function handleError(err, stats) {
  console.log(stats.toString({
    colors: true,
    cached: false,
  }));
}
