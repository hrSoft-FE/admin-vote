/**
 * Created by armor on 17-8-12.
 */
import React from 'react'
import { connect } from 'dva'
import img from './img/3.jpg'
import QueueAnim from 'rc-queue-anim'
import './index.less'

const ShowItems = ({download, dispatch}) => {
  const {modalContent} = download
  const {messages = []} = modalContent
  const demoToChildren = messages.map((item, i) => {
    const {title, content = '资料下载'} = item
    return (
      <li key={i}>
        <a href='ftp://ftp.nuedc.com.cn/2017/'>
          <div className='home-anim-demo-img'>
            <img src={img} width='100%' />
          </div>
          <h2>{title}</h2>
          <div className='home-anim-demo-text'>
            <h2>{content}</h2>
          </div>
        </a>
      </li>
    )
  })

  return (
    <div className='home-content show-items'>
      <QueueAnim
        className='page-text'
        key='text'
        type='bottom'
        leaveReverse
        delay={[0, 100]}>
        <h1 key='h1'>下载中心</h1>
        <p key='p'>
          下载中心为您提供最新最全的电子设计竞赛资料下载
        </p>
      </QueueAnim>
      <div key='img' className='home-anim-demo'>
        <ul>
          {demoToChildren}
        </ul>
      </div>
    </div>
  )
}

export default connect(({app, download}) => ({app, download}))(ShowItems)