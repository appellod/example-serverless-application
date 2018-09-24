const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(config, webpack) {
  config.externals = {
    'sqlite3': 'sqlite3',
    'mariasql': 'mariasql',
    'mssql': 'mssql',
    'mssql/lib/base': 'mssql/lib/base',
    'mssql/package.json': 'mssql/package.json',
    'mysql': 'mysql',
    'mysql2': 'mysql2',
    'oracle': 'oracle',
    'strong-oracle': 'strong-oracle',
    'oracledb': 'oracledb',
    'pg-native': 'pg-native',
    'pg-query-stream': 'pg-query-stream',
    'tedious': 'tedious'
  };
  config.plugins.push(new UglifyJSPlugin({ cache: true }));

  return config;
}