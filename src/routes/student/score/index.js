/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import { connect } from 'dva'
import { Alert } from 'antd'
import { Link } from 'dva/router'

const ScorePage = ({student}) => {
  const contest_id = 'none'
  return (
    <div className='main-wrapper'>
      {
        contest_id === 'none' ? (
          <Alert
            message={(<span>请在下拉选单中选择竞赛</span>)}
            description={(<Link to='/student'> 如果您尚未参加过任何比赛</Link>)}
            showIcon
          />
        ) : (
          <Alert
            message={(<span>比赛进行中</span>)}
            description='竞赛成绩还未发布，请耐心等待'
            showIcon
          />
        )
      }
    </div>
  )
}

export default connect(({app, student}) => ({app, student}))(ScorePage)