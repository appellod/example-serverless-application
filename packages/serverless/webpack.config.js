const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(config, webpack) {
  config.externals = { knex: 'commonjs knex' };
  config.plugins.push(new UglifyJSPlugin({ cache: true }));

  return config;
}