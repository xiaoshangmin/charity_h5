module.exports = {
    productionSourceMap: false,
    publicPath: '/html',
    // lintOnSave: false, //是否开启eslint

    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://xsm.fun.com/',
                secure: false,
                ws: true,
                changeOrigin: true
            }
        }
    }
}