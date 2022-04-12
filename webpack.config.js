const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //development {nomin}, prod{min}
    entry: './src/index.js', //ubicacion de codigo fuente, donde inicia todo
    output: {
        filename: '[name].bundle.js', //nombre del archivo que queremos generar para el bundle
        path: path.resolve(__dirname, 'output'), //almacanemos el output en un nuevo directorio dentro de nuestro root path
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|mp4)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
        ],
    },
};
