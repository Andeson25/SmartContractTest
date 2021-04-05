const BASE_CONFIG = require('./webpack.config.base');

module.exports = {
    ...BASE_CONFIG.config(false),
    mode: 'production'
};
