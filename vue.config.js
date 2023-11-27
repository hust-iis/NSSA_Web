const webpack = require("webpack");

module.exports = {
    devServer: {
        proxy: {
            '/cmdb': {
                target: 'http://222.20.126.128:8001/',
                secure: false, // false为http访问，true为https访问
                changeOrigin: true, // 跨域访问设置，true代表跨域
            },
            "/user": {
                target: "http://222.20.126.128:8001/",
                secure: false, // false为http访问，true为https访问
                changeOrigin: true, // 跨域访问设置，true代表跨域
            },

        }
    },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    },

    chainWebpack(config) {
		config.plugin('html').tap((args) => { //标题
			args[0].title = '安全态势感知与分析系统';
			return args;
		})
	},
}