import path from 'path'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
// import globAll from 'glob-all';
import { globSync } from 'glob'
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin'

import baseConfig from './webpack.base'

const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => !source.includes('index.html') // 忽略index.html
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css' // 抽离css的输出目录和名称, 加上[contenthash:8]
    }),
    // 清理无用css，检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
    // 只打包这些文件中用到的样式
    new PurgeCSSPlugin({
      // paths: globAll.sync(
      //   [`${path.join(__dirname, '../src')}/**/*`, path.join(__dirname, '../public/index.html')],
      //   {
      //     nodir: true
      //   }
      // ), // TODO:现有的glob-all.d.ts 的 declare module 'globAll'方案不可用，新建了.d.ts文件仍然提示错误。

      // paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, {
      //   nodir: true
      // }),
      paths: globSync(`${path.join(__dirname, '../src')}/**/*`, {
        nodir: true
      }),
      // 用 only 来指定 purgecss-webpack-plugin 的入口
      // https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin
      only: ['dist'],
      safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
      },
      blocklist: undefined // 不知道为啥？ 类型要求是非空
    }),

    // 打包时生成gzip文件
    new CompressionPlugin({
      test: /\.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ],
  optimization: {
    mergeDuplicateChunks: true, // 合并相同的 chunk
    // splitChunks: {
    //   chunks: "all",
    // },
    splitChunks: {
      // 分隔代码, 参考：https://zhuanlan.zhihu.com/p/615064733
      // chunks: 'async',//表示将选择哪些块进行优化。提供字符的有效值为all、async和initial,默认是仅对异步加载的块进行分割。
      // minSize: 100 * 1024,//模块大于minSize时才会被分割出来。默认100k
      // maxSize: 0,//生成的块的最大大小，如果超过了这个限制，大块会被拆分成多个小块。
      // minChunks: 1,//拆分前必须共享模块的最小块数。
      // maxAsyncRequests: 5,//按需加载时并行请求的最大数目。
      // maxInitialRequests: 3,//入口点的最大并行请求数
      // automaticNameDelimiter: '~',//默认情况下，webpack将使用块的来源和名称（例如vendors~main.js）生成名称。此选项允许您指定要用于生成的名称的分隔符。
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块, 不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1 // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0 // 提取代码体积大于0就提取出来
        }
      }
    },

    // TODO: 使用script-ext-html-webpack-plugin将runtime文件插入到html

    // 发现文件很小，且就是加载chunk的依赖关系的文件。虽然每次构建后app的hash没有改变，但是runtime~xxx.js会变啊。每次重新构建上线后，浏览器每次都需要重新请求它，它的 http 耗时远大于它的执行时间了，所以建议不要将它单独拆包，而是将它内联到我们的 index.html 之中。这边我们使用script-ext-html-webpack-plugin来实现。（也可使用html-webpack-inline-source-plugin，其不会删除runtime文件。）

    runtimeChunk: {
      // 参考：https://www.jianshu.com/p/714ce38b9fdc，https://zhuanlan.zhihu.com/p/615064733
      name: 'runtime' // 通过将 optimization.runtimeChunk 设置为 object，对象中可以设置只有 name 属性，其中属性值可以是名称或者返回名称的函数，用于为 runtime chunks 命名
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 删除console.log
          }
        }
      })
    ]
  },
  performance: {
    hints: false, // false表示关闭提示，在生产环境中，建议设置为’error’，有助于防止把体积巨大的Bundle部署到生产环境，从而影响程序性能。
    maxAssetSize: 4000000, // 整数类型（以字节为单位）,资源(asset)是从Webpack生成的任何文件。此选项根据单个资源体积，控制Webpack何时生成性能提示。默认值是：250000 (bytes)。
    maxEntrypointSize: 5000000 // 整数类型（以字节为单位）, 此选项根据入口起点的最大体积，控制Webpack何时生成性能提示。默认值是：250000 (bytes)。
  }
})

export default prodConfig
