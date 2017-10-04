/**
 * Created by armor on 17-8-11.
 */
import React from 'react'
import { connect } from 'dva'
import img from './img/1.jpg'
import { Link } from 'dva/router'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import './index.less'

const ShowItems = ({news, dispatch}) => {
  const {modalContent} = news
  const {messages = []} = modalContent
  const demoToChildren = messages.map((item, i) => {
    const {id, title, created_at} = item
    return (
      <li key={i}>
        <Link to={'/news/' + id}>
          <div className='home-anim-demo-img'>
            <img src={img} width='100%' />
          </div>
          <h2>{title}</h2>
          <div className='home-anim-demo-text'>
            <p>{created_at}</p>
          </div>
        </Link>
      </li>
    )
  })

  const fetchMore = (e) => {
    e.preventDefault()
    dispatch({type: 'news/fetchMore'})
  }
  return (
    <div className='home-content show-items'>
      <QueueAnim
        className='page-text'
        key='text'
        type='bottom'
        leaveReverse
        delay={[0, 100]}>
        <h1 key='h1'>新闻中心</h1>
        <p key='p'>
          新闻中心为您提供最新最全的电子设计竞赛赛况
        </p>
      </QueueAnim>
      <div key='img' className='home-anim-demo'>
        <ul>
          {demoToChildren}
        </ul>
        <div>
          <TweenOne
            key='a'
            className='news-button'
            style={{marginBottom: '80px'}}
          >
            <Link onClick={fetchMore}>查看更多</Link>
          </TweenOne>
        </div>
      </div>
    </div>
  )
}

export default connect(({app, news}) => ({app, news}))(ShowItems)
