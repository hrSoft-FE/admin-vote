/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import MarkDown from '../../../components/Markdown'
import './index.less'
import TweenOne from 'rc-tween-one'
import { Card } from 'antd'
import { connect } from 'dva'
import { guide } from './guide.json'
const GuidePage = ({}) => {
  const {title = '', content = ''} = guide
  return (
    <div>
      <div className='news-content-header'>
        <TweenOne
          animation={{y: '+=30', opacity: 0, type: 'from'}}
          component='h1'
          key='h1'
          reverseDelay={200}
          className='news-content-title'
        >
          {title}
        </TweenOne>
      </div>
      <Card className='news-content-markdown'>
        <MarkDown content={content} />
      </Card>
    </div>
  )
}

export default connect(({student}) => ({student}))(GuidePage)
