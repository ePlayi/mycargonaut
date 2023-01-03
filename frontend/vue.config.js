const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false,
  publicPath: './',
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  }
})
