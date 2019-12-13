const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: 'src/index.js',
    mode: 'production',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            inlineSource: '.js$',
            template: 'src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_mdules/,
                loader: 'eslint-loader',
                options: {
                    emitError: true
                }
            }
        ]
    }
};
