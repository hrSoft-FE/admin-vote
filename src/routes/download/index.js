/**
 * Created by armor on 17-8-12.
 */
import React from 'react'
import ShowItems from './ShowItems'
import { connect } from 'dva'

const download = ({children}) => {
  return (
    <div className='news-wrapper'>
      {
        children ||
        <div className='newsCard'>
          <div className='news-content'>
            <ShowItems />
          </div>
        </div>
      }
    </div>
  )
}

export default connect(({app, download}) => ({app, download}))(download)

