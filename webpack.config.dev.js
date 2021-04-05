const BASE_CONFIG = require('./webpack.config.base');

module.exports = {
    ...BASE_CONFIG.config(true),
    mode: 'development',
    devtool: 'inline-source-map'
};
