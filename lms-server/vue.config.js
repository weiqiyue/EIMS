var webpack = require("webpack");
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', //API服务器的地址(由于此处我nodejs后台用了路由，所以+了api)，正常不加               
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        },
    },
    configureWebpack: {
        plugins: [ // 3. 配置全局使用 jquery
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                jquery: "jquery",
                "window.jQuery": "jquery",
                Popper: ['popper.js', 'default']
            })
        ],
    }
}