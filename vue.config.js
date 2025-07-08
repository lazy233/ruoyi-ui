const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },

  // 正确放置 proxy 配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        logLevel: 'debug',
        onProxyReq: (proxyReq, req, res) => {
          console.log('代理请求:', req.method, req.url, '->', proxyReq.path);
        },
        onError: (err, req, res) => {
          console.error('代理错误:', err.message);
        }
      }
    }
  }
});
