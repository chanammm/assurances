var [path, HtmlWebpackPlugin, MiniCssExtractPlugin, optimizecssassets, uglifyjs, extractTextWebpackPlugin, fs] = [
    require('path'), require('html-webpack-plugin'), require('mini-css-extract-plugin'), require('optimize-css-assets-webpack-plugin'), require('uglifyjs-webpack-plugin'),
    require('extract-text-webpack-plugin'), require('fs-extra')
];



// fs.readdir('./src/views/', (err,files) => {  //拉取views 目录下的所有文件 -- 
//     console.log(files.forEach(Element => {
//         console.log(Element)
//     }));
// })

module.exports = {
    mode: 'development',  //模式 production development
    optimization: {
        minimizer: [
            new uglifyjs({
                cache: false
            }),
            new optimizecssassets()
        ]
    },
    entry: {
        configration: './src/public/javascripts/interactive/configuraction.js',  //配置文件
        login: './src/public/javascripts/interactive/login.js', //登陆操作
        index: './src/public/javascripts/interactive/index.js', //common 首页
        list: './src/public/javascripts/interactive/list.js', // 列表页
        crud: './src/public/javascripts/interactive/crud.js',  //增删改查
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    // devtool: 'eval-source-map',
    output: {
        filename: '[name]._23_aKvs-b8bW2Vg3fwHozO.js',
        path: path.resolve(__dirname, './src/dist/javascripts/')
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    plugins: [
        new HtmlWebpackPlugin({  //login
            template: './src/views/login.html',
            filename: '../login.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'login']
        }),
        new HtmlWebpackPlugin({  //common/index
            template: './src/views/index.html',
            filename: '../views/common/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'index']
        }),
        new HtmlWebpackPlugin({  //app
            template: './src/views/app.html',
            filename: '../views/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['']
        }),
        new HtmlWebpackPlugin({  //user
            template: './src/views/user.html',
            filename: '../views/user.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //assets
            template: './src/views/assets.html',
            filename: '../views/assets.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //customer
            template: './src/views/customer.html',
            filename: '../views/customer.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //machine
            template: './src/views/machine.html',
            filename: '../views/machine.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new MiniCssExtractPlugin({
            template: './src/public/stylesheets/base/style.min.css',
            filename: '../stylesheets/-b8bW2Vg3fwHozO.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'  //出现在顶部
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        outputPath: '../images/'
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: false
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: ['html-loader', 'pug-html-loader']
            }
        ]
    }
}