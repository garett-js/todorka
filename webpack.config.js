const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin")
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// !! Попробовать PostCSS

module.exports = {
    // Входная точка приложения
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        // Файл bundle.js после билда в папке dist
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Минифицировать css и js
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    // Насйтрока для webpack-dev-server
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 5050
    },
    // Плагины чтобы webpack сам добавлял html и css
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
            //chunkFilename: '[id].css'
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            // Правило как будет грузится файл css
            {
                test: /\.css$/,
                //  use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // Правило как будет грузится файл Less
            // {
            //     test: /\.less$/,
            //     //  use: ['style-loader', 'css-loader'],
            //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            // },
            // // Правило как будет грузится файл Sass
            {
                test: /\.scss$/,
                //  use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            // Правило как будет грузится babel
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // Правило как грузить картинки дляоптимизации
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name][hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 70
                            }
                        }
                    }
                ]
            },
            // Правило как грузить шрифты
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name][hash].[ext]'
                    }
                }
            }
        ]
    }
}