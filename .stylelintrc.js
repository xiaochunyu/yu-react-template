// @see: https://stylelint.io
module.exports = {
  plugins: ['stylelint-scss', 'stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件
    'stylelint-config-standard-scss' // 配置 stylelint scss
    // 'stylelint-config-css-modules'
  ],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less)'],
      customSyntax: 'postcss-less'
    },
    {
      files: ['**/*.{scss,css,sass}'], // css 相关文件由 postcss-scss 处理
      customSyntax: 'postcss-scss'
    }
  ],

  rules: {
    /**
     * indentation: null, // 指定缩进空格
      "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
      "function-url-quotes": "always", // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
      "string-quotes": "double", // 指定字符串使用单引号或双引号 @deprecated
      "unit-case": null, // 指定单位的大小写 "lower(全小写)"|"upper(全大写)"
      "color-hex-case": "lower", // 指定 16 进制颜色的大小写 "lower(全小写)"|"upper(全大写)"
      "color-hex-length": "long", // 指定 16 进制颜色的简写或扩写 "short(16进制简写)"|"long(16进制扩写)"
      "rule-empty-line-before": "never", // 要求或禁止在规则之前的空行 "always(规则之前必须始终有一个空行)"|"never(规则前绝不能有空行)"|"always-multi-line(多行规则之前必须始终有一个空行)"|"never-multi-line(多行规则之前绝不能有空行。)"
      "font-family-no-missing-generic-family-keyword": null, // 禁止在字体族名称列表中缺少通用字体族关键字
      "block-opening-brace-space-before": "always", // 要求在块的开大括号之前必须有一个空格或不能有空白符 "always(大括号前必须始终有一个空格)"|"never(左大括号之前绝不能有空格)"|"always-single-line(在单行块中的左大括号之前必须始终有一个空格)"|"never-single-line(在单行块中的左大括号之前绝不能有空格)"|"always-multi-line(在多行块中，左大括号之前必须始终有一个空格)"|"never-multi-line(多行块中的左大括号之前绝不能有空格)"
      "property-no-unknown": null, // 禁止未知的属性(true 为不允许)
      "no-empty-source": null, // 禁止空源码
      "declaration-block-trailing-semicolon": null, // 要求或不允许在声明块中使用尾随分号 string："always(必须始终有一个尾随分号)"|"never(不得有尾随分号)"
      "selector-class-pattern": null, // 强制选择器类名的格式
      "value-no-vendor-prefix": null, // 关闭 vendor-prefix(为了解决多行省略 -webkit-box)
      "at-rule-no-unknown": null,
      "selector-pseudo-class-no-unknown": [
        true,
        {
          ignorePseudoClasses: ["global", "v-deep", "deep"]
        }
      ]
    }
     */
    // 'selector-class-pattern': [
    //   // 命名规范 -, 不能使用驼峰
    //   '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
    //   {
    //     message: 'Expected class selector to be kebab-case'
    //   }
    // ],
    'color-function-notation': 'legacy', //
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null, // 强制选择器类名的格式
    // 'string-quotes': 'single', // single:单引号, double: 双引号 @deprecated
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    // 'at-rule-name-case': 'lower', // 指定@规则名的大小写 @deprecated
    'length-zero-no-unit': true, // 禁止零长度的单位（可自动修复）
    'shorthand-property-no-redundant-values': true, // 简写属性
    // 'number-leading-zero': 'always', // 小数不带0 // @deprecated
    'declaration-block-no-duplicate-properties': true, // 禁止声明快重复属性
    'no-descending-specificity': true, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    'selector-max-id': null, // 限制一个选择器中 ID 选择器的数量
    'max-nesting-depth': 10,
    'declaration-block-single-line-max-declarations': 1,
    // 'block-opening-brace-space-before': 'always', // @deprecated
    // 'selector-max-type': [0, { ignore: ['child', 'descendant', 'compounded'] }],
    // indentation: [ // @deprecated
    //   2,
    //   {
    //     // 指定缩进  warning 提醒
    //     severity: 'warning'
    //   }
    // ],
    'order/order': ['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules'],
    'order/properties-order': [
      // 规则顺序
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-color',
      'border',
      'border-radius',
      'content',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'transform'
    ]
  }
}
