import React from 'react'
import MarkDown from '../../../components/Markdown'
import './index.less'
import TweenOne from 'rc-tween-one'
import { Card } from 'antd'
import { guide } from './guide.json'
import { connect } from 'dva'

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
        <MarkDown source={content} />
      </Card>
    </div>
  )
}

export default connect(({app, GuideContent}) => ({app, GuideContent}))(GuidePage)
