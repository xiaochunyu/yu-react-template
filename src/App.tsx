import { useState, lazy, Suspense } from 'react'
// import lessStyles from '@/app.less'
import scssStyles from '@/app.scss'
import stylStyles from '@/app.styl'

// import miniImg from '@/assets/imgs/2KB.png'
// import smallImg from '@/assets/imgs/10KB.jpg'
// import middleImg from '@/assets/imgs/16KB.jpeg'
// import bigImg from '@/assets/imgs/350KB.jpeg'
// import memberList from '@/test.json'
// import { SvgIcon, Demo1, Demo2, LazyWrapper } from '@/components'
import { SvgIcon, Demo1, LazyWrapper } from '@/components'

function App() {
  const [count, setCounts] = useState('')
  const [show, setShow] = useState(false)

  // prefetch
  const PreFetchDemo = lazy(
    () =>
      import(
        /* webpackChunkName: "PreFetchDemo" */
        /* webpackPrefetch: true */
        '@/components/PreFetchDemo'
      )
  )

  // preload
  const PreloadDemo = lazy(
    () =>
      import(
        /* webpackChunkName: "PreloadDemo" */
        /* webpackPreload: true */
        '@/components/PreloadDemo'
      )
  )

  const onChange = (e: any) => {
    setCounts(e.target.value)
  }

  // console.log(memberList, 'memberList')

  // 点击事件中动态引入css, 设置show为true
  const handleOnClick = () => {
    import('@/App.css')
    setShow(true)
  }

  return (
    <div>
      <h2>
        webpack5-react-ts
        <SvgIcon iconName='icon-fanchuan' color='#f00'></SvgIcon>
        <SvgIcon iconName='icon-dujia' color='#f00'></SvgIcon>
      </h2>
      <Demo1></Demo1>
      <h2 onClick={handleOnClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
          <LazyWrapper path='LazyDemo' />
        </>
      )}

      {/* <div className={lessStyles.lessBox}>
        <div className={lessStyles.box}>lessBox。。。111</div>
        <img src={miniImg} alt='2kb - 小于10kb的图片' />
        <img src={smallImg} alt='10kb - 小于10kb的图片' />
        <img src={middleImg} alt='16kb - 大于于10kb的图片' />
        <img src={bigImg} alt='350kb - 大于于10kb的图片' />
        <div className={lessStyles.miniImg}>mini图片背景</div>
        <div className={lessStyles.smallImg}>小图片背景</div>
        <div className={lessStyles.middleImg}>中图片背景</div>
        <div className={lessStyles.bigImg}>大图片背景</div>
      </div> */}
      <div className={scssStyles.scssBox}>
        <div className={scssStyles.box}>scssBox。</div>
      </div>
      <div className={stylStyles.stylBox}>
        <div className={stylStyles.box}>stylBox。。。</div>
      </div>
      <div>
        <p>受控组件 1</p>
        <input type='text' value={count} onChange={onChange} />
        <br />
        <p>非受控组件 1</p>
        <input type='text' />
      </div>
    </div>
  )
}

export default App
