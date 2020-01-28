module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://sample.bmaster.kro.kr',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}