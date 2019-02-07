const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

// function generateHtmlPlugins(templateDir) {
//     const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//     return templateFiles.map(item => {
//         const parts = item.split('.');
//         const name = parts[0];
//         const extension = parts[1];
//         return new HtmlWebpackPlugin({
//             filename: `${name}.html`,
//             template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//             // inject: false,
//         })
//     })
// }
function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.pug`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            // inject: false,
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views')

module.exports = {
    entry: [
        './src/js/index.js',
        './src/styl/style.styl',
        // './src/pug/index.pug',
    ],
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            // {
            //     test: /\.(pug|jade)$/,
            //     // include: path.resolve(__dirname, 'src/html/includes'),
            //     use: ['raw-loader']
            // },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                },
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {},
            //         },
            //     ],
            // },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url-loader'
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },{
                test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
                use: [
                    'url-loader', // or file-loader or svg-url-loader
                    'svg-transform-loader'
                ]
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-inline-loader'
            // },
            // {
            //     test: /\.styl$/,
            //     include: path.resolve(__dirname, 'src/styl'),
            //     use: ExtractTextPlugin.extract({
            //         use: [{
            //             loader: "css-loader",
            //             options: {
            //                 sourceMap: true,
            //                 // minimize: true,
            //                 url: false
            //             }
            //         },
            //             {
            //                 loader: "style-loader",
            //                 options: {
            //                     sourceMap: true
            //                 }
            //             }
            //         ]
            //     })
            // },
            {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
        })
    ]
    // .concat(htmlPlugins)
};