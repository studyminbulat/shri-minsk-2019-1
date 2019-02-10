const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackOnBuildPlugin = require('on-build-webpack');
// const extractCSS = new ExtractTextPlugin('styles.min.css');

module.exports = {
    entry: [
        // './src/js/index.js',
        './src/styl/style.styl',
        './src/pug/index.pug',
    ],
    // output: {
        // filename: './js/bundle.js'
        // filename: '[name].css',
    // },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader',
                // options: {
                //     pretty: true,
                // },
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader?limit=1024&name=images/[name].[ext]'
                    }
                ]
            },

            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader',
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            // filename: '[name].[hash].css',
            // chunkFilename: '[id].[hash].css',
            chunkFilename: '[id].css',
        }),
        // new WebpackOnBuildPlugin( () => {
        //     fs.unlinkSync(path.join('dist', 'main.js'));
        // }),
    ],

};