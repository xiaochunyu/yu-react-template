import { FC, lazy, Suspense } from 'react'

interface LazyWrapperProps {
  /** 组件路径： 在 src/pages 目录下的页面路径，eg: /home => src/pages/home/index.tsx */
  path: string
}
/**
 * 懒加载组件包装器
 */
const LazyWrapper: FC<LazyWrapperProps> = ({ path }) => {
  const LazyComponent = lazy(() => import(`@/components/${path}`)) // 使用import语法配合react的Lazy动态引入资源

  // // preload
  // const LazyPreloadComponent = lazy(
  //   () =>
  //     import(
  //       /* webpackChunkName: "PreloadDemo" */
  //       /*webpackPreload: true*/
  //       `@/components/${path}`
  //     )
  // );

  // // prefetch
  // const LazyPreFetchComponent = lazy(
  //   () =>
  //     import(
  //       /* webpackChunkName: "PreFetchDemo" */
  //       /*webpackPrefetch: true*/
  //       `@/components/${path}`
  //     )
  // );

  return (
    <Suspense fallback={<div>loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}

export default LazyWrapper
