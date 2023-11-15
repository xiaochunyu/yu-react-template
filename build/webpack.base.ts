import { Configuration, DefinePlugin } from 'webpack'
import WebpackBar from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as dotenv from 'dotenv'
import path from 'path'

const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式

const tsRegex = /.(ts|tsx)$/
const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/
const lessRegex = /\.less$/
const stylRegex = /\.styl$/
const imageRegex = /\.(png|jpe?g|gif|svg)$/i
const fontRegex = /.(woff2?|eot|ttf|otf)$/
const mediaRegex = /.(mp4|webm|ogg|mp3|wav|flac|aac)$/
// const jsonRegex = /\.json$/

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, `../env/.env.${process.env.BASE_ENV}`)
})

const styleLoadersArray = [
  isDEV ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-loader,打包模式抽离css
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[path][name]__[local]--[hash:5]'
      }
    }
  },
  // 添加 postcss-loader
  'postcss-loader'
]

// console.log('NODE_ENV', process.env.NODE_ENV)
// console.log('BASE_ENV', process.env.BASE_ENV)
// console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);
// console.log("envConfig", envConfig);

const baseConfig: Configuration = {
  entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
  // 打包出口文件
  output: {
    filename: 'static/js/[name].[chunkhash:8].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径

    // 这里自定义输出文件名的方式是，将某些资源发送到指定目录
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  // loader 配置
  module: {
    rules: [
      {
        test: tsRegex, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
        // 警告：值得注意的是，开启多线程也是需要启动时间，thread-loader会将你的loader放置在一个worker池里面运行，每个worker都是一个单独的有600ms限制的 Node.js 进程。同时跨进程的数据交换也会被限制，所以最好是项目变大到一定程度之时再采用，否则效果反而不好。
      },
      {
        test: cssRegex, // 匹配 css 文件
        use: styleLoadersArray
      },
      {
        test: lessRegex,
        use: [
          ...styleLoadersArray,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                importLoaders: 2,
                // 可以加入modules: true，这样就不需要在less文件名加module了
                modules: true,
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: sassRegex,
        use: [...styleLoadersArray, 'sass-loader']
      },
      {
        test: stylRegex,
        use: [...styleLoadersArray, 'stylus-loader']
      },
      // asset/resource: 发送一个单独的文件，并导出 URL，替代 file-loader，相当于file-loader, 将文件转化成Webpack能识别的资源，其他不做处理。
      // asset/inline: 导出一个资源的 data URI，以前使用 url-loader 实现。
      // asset/source: 导出资源的源代码 ，以前是使用 raw-loader 实现。
      // asset: 相当于自动选择 asset/resource 或 asset/inline，替换 url-loader 中的 limit，相当于url-loader将文件转化成Webpack能识别的资源，同时小于某个大小的资源会处理成data URI形式。
      {
        test: imageRegex, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb转base64
          }
        },
        // 将图片文件输出到 static/imgs 目录中
        // 将图片文件命名 [hash:8][ext][query]
        // [hash:8]: hash值取8位
        // [ext]: 使用之前的文件扩展名
        // [query]: 添加之前的query参数

        generator: {
          filename: 'static/images/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
        }
      },
      {
        test: fontRegex, // 匹配字体图标文件
        type: 'asset/resource', // 发送一个单独的文件，并导出 URL，替代 file-loader，相当于file-loader, 将文件转化成Webpack能识别的资源，其他不做处理。
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
        }
      },
      {
        test: mediaRegex, // 匹配媒体文件
        type: 'asset/resource', // 发送一个单独的文件，并导出 URL，替代 file-loader，相当于file-loader, 将文件转化成Webpack能识别的资源，其他不做处理。
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
        }
      }
      // {
      //     // 匹配json文件
      //     test: jsonRegex,
      //     type: "asset/source", // 发送一个单独的文件，并导出 URL，替代 file-loader，相当于file-loader, 将文件转化成Webpack能识别的资源，其他不做处理。
      //     generator: {
      //         // 这里专门针对json文件的处理
      //         filename: "static/json/[name].[hash][ext][query]",
      //     },
      // },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      '@': path.join(__dirname, '../src')
      // '@': path.resolve(__dirname, 'src'),
      // '@/components': path.resolve(__dirname, 'src/components'),
    }
    // modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'yu-react-template',
      filename: 'index.html',
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        removeAttributeQuotes: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, '../node_modules')
    }),
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackBar({
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false // 默认false，启用探查器。
    })
  ]
}

export default baseConfig
