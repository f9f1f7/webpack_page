const path = require('path')
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin') // 压缩js文件
const htmlPlugin = require('html-webpack-plugin') // 打包html文件
// const extractTextPlugin = require('extract-text-webpack-plugin') // css分离
const glob = require('glob')
const PurifyCSSPlugin = require("purifycss-webpack") // 消除未使用的CSS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin")
// const WEBSITE = {
//     publicPath: 'http://localhost:8888/' // 配置绝对路径
// }

module.exports = {
    mode: 'development',
    entry: { // 入口文件配置项
        main: './src/main.js'
        // main2: './src/main2.js',
    },
    output: { // 出口文件配置项
        path: path.resolve(__dirname, './dist'), // 打包路劲
        filename: '[name].bundle.js', // 打包的文件名
        // publicPath: WEBSITE.publicPath // 处理静态文件路径 / ? ./
        publicPath: process.env.NODE_ENV === 'development' ? '/' : './'
    },
    // 模块 css image等
    module: {
        rules: [
            {
                test: /\.(html|htm)$/i,
                use: ['html-withimg-loader'] // img标签的问题
            },
            {
                test: /\.css$/,
                // use: extractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         {loader: 'css-loader'},
                //         {loader: 'postcss-loader'}
                //     ]
                // }),
                use: ['css-loader', 'postcss-loader']
            },
            {
                test: /\.s(c|a)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {loader: 'url-loader', // 处理图片路径的,里面包含了file-loader
                     options: {
                        limit: 5000,
                        outputPath: 'images/'
                     }},
                ]
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    // 插件,用户生产模板和各项功能
    plugins: [
        new CopyPlugin([{
            from: path.resolve(__dirname, "src/logo.ico"),
            to: __dirname + '/dist',
            ignore: ['.*']
        }]),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new htmlPlugin({
            // minify: true,
            minify:{                    //压缩HTML文件，常用属性如下
                removeComments: true,                  // 移除HTML中的注释
                collapseWhitespace: true,              // 删除空白符
                // preserveLineBreaks: true,              // 删除换行
                // removeStyleLinkTypeAttributes: true,    // type="text/css"从style和link标签中删除
                // removeScriptTypeAttributes: true        // type="text/javascript"从script标签中删除
            },
            hash: true,
            // favicon: 'path',
            template: './src/index.html'
        }),
        // new extractTextPlugin('css/test.css'),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new uglify(),
        new CleanWebpackPlugin(), // 自动删除
    ],
    // 配置webpack开发服务功能
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        compress: true,
        port: 8888
    }
}