'use strict'
const titles = require('./title.js')
const webpack =require('webpack')
const glob = require('glob')
const pages = {}

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})

module.exports = {
  pages,
  // runtimeCompiler: true,
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.plugins.delete('named-chunks')
  // },
  devServer: {port: 8081, disableHostCheck: true},

  // // 增加一个plugins
  // 第三方插件配置
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  // pluginOptions: {
  //   $:'jquery',
  // },

}
