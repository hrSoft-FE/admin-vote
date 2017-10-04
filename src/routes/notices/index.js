/**
 * Created by wang on 2017/8/12.
 */
import React from 'react'
import './index.less'
import NoticesItems from './noticesItems'
import { connect } from 'dva'

const notice = ({children}) => {
  return (
    <div className='news-wrapper'>
      {
        children ||
        <div className='newsCard'>
          <div className='news-content'>
            <NoticesItems />
          </div>
        </div>
      }
    </div>
  )
}

export default connect(({app, notice}) => ({app, notice}))(notice)
