const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// noinspection WebpackConfigHighlighting
module.exports = {
    config: isDev => {
        return {
            entry:        path.resolve(__dirname, './src/index.js'),
            target:       'web',
            module:       {
                rules: [
                    {
                        test:    /\.(js|jsx)$/,
                        exclude: /(node_modules)/,
                        use:     {
                            loader:    'babel-loader',
                            options:   {
                                plugins: ['@babel/plugin-proposal-class-properties'],
                                presets: ['@babel/preset-env', '@babel/preset-react']
                            }
                        }
                    },
                    {
                        test:    /\.(ts|tsx)$/,
                        use:     'ts-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.scss$/,
                        use:  [
                            MiniCssExtractPlugin.loader,
                            {
                                loader:  'css-loader',
                                options: {
                                    url:       false,
                                    sourceMap: isDev
                                }
                            },
                            {
                                loader:  'sass-loader',
                                options: {
                                    sourceMap: isDev
                                }
                            }
                        ]
                    }
                ]
            },
            resolve:      {
                modules:    [path.join(__dirname), 'node_modules'],
                extensions: ['.tsx', '.ts', '.jsx', '.js']
            },
            output:       {
                path:     path.resolve(__dirname, './dist'),
                filename: 'bundle.js',
                clean:    true
            },
            devServer:    {
                contentBase: path.join(__dirname, 'dist/assets'),
                port:        8080
            },
            plugins:      [
                new webpack.ProvidePlugin({
                    'React':    'react',
                    'ReactDOM': 'react-dom',
                    '_':        ['lodash'],
                    '$':        ['jquery']
                }),
                new MiniCssExtractPlugin({
                    filename: 'assets/styles/styles.css'
                }),
                new HtmlWebpackPlugin({
                    title:    'Output Management',
                    filename: 'index.html',
                    template: path.resolve(__dirname, './src/index.html'),
                    cache:    !isDev,
                    minify:   false,
                    chunks:   'all'
                }),
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from:             path.resolve(__dirname, './src/assets'),
                            noErrorOnMissing: true,
                            to:               'assets',
                            globOptions:      {
                                ignore: ['**/*.scss']
                            }
                        }
                    ]
                })
            ],
            optimization: {
                moduleIds:            'deterministic',
                minimize:             !isDev,
                minimizer:            [
                    '...',
                    new TerserPlugin({
                        parallel:        true,
                        extractComments: isDev
                    })
                ],
                mergeDuplicateChunks: true,
                concatenateModules:   true
            }
        };
    }
};
