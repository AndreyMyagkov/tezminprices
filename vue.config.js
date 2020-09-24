module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tezminprices/'
    : '/tezminprices/',

  assetsDir: './tezminprices/',
  productionSourceMap: false,
  
  //assetsDir: '/assets/',
  filenameHashing: false,

  pluginOptions: {
    i18n: {
      locale: 'ru',
      fallbackLocale: 'ru',
      localeDir: 'src',
      enableInSFC: true
    }
  },

  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(args => {
        args.compilerOptions.whitespace = 'preserve'
      })
    config.optimization.delete('splitChunks')
  },

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/tezminprices/index.html',
      filename: 'index.html',
      title: 'Tez Tour',
      //chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // et: {
    //     entry: 'src/main.js',
    //     template: 'public/tez/et.html',
    //     filename: 'et.html',
    //     title: 'Tez Tour',
    //   //chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
  },



}
