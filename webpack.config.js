const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const miniCSS = require('mini-css-extract-plugin')
const optimizeCSS = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer: {
        contentBase: './public',
        port: 9000
    },
    optimization: {
        minimizer: [
            new optimizeCSS({
                cache: true,
                parallel: true
            }),
            new optimizeCSS({})
        ]   
    },
    plugins: [
        new miniCSS({
            filename: "estilo.css"
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                miniCSS.loader,
                //'style-loader', // Adiciona CSS a DOM a tag<style>
                'css-loader', //Interpreta @import
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
            
        }]
    }
}
