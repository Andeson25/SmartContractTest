const BASE_CONFIG = require('./webpack.config.base');

module.exports = {
    ...BASE_CONFIG.config(false),
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
