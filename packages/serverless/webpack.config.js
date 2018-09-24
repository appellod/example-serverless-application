const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(config, webpack) {
  config.externals = {
    'sqlite3': 'sqlite3',
    'mariasql': 'mariasql',
    'mssql': 'mssql',
    'mysql2': 'mysql',
    'oracle': 'oracle',
    'strong-oracle': 'strong-oracle',
    'oracledb': 'oracledb',
    'pg-query-stream': 'pg-query-stream'
  };
  config.plugins.push(new UglifyJSPlugin({ cache: true }));

  return config;
}