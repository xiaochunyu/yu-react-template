declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        BASE_ENV: 'development' | 'test' | 'pre' | 'production'
        NODE_ENV: 'development' | 'production'
      }
    }
  }
}


/* CSS MODULES */
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// 不需要写完整的名称,如 app.module.scss,可以直接简写为app.scss, 而不会报错类型错误
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}


declare module '*.styl' {
  const classes: { [key: string]: string };
  export default classes;
}


// 由于我们希望通过 ES6 的新语法 ESModule 的方式导入资源，为了使 TypeScript 可以识别图片模块
/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}

declare module '*.bmp' {
  const ref: string;
  export default ref;
}

declare module '*.gif' {
  const ref: string;
  export default ref;
}

declare module '*.jpg' {
  const ref: string;
  export default ref;
}

declare module '*.jpeg' {
  const ref: string;
  export default ref;
}

declare module '*.png' {
  const ref: string;
  export default ref;
}

declare module '@*'