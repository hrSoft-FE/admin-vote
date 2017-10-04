/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import { connect } from 'dva'
import { Alert, Select } from 'antd'
import { Link } from 'dva/router'

const ProblemPage = (student) => {
  const contest_id = 'none'
  const {tablePass: contestTable = [], problemSelectInfo, table = []} = student
  return (
    <div className='problem'>
      <div className='problem-header'>
        <Select showSearch
          style={{width: 260}}
          placeholder='选择竞赛'
          value={contest_id || undefined}>
          {contestTable.map(item => (
            <Select.Option key={'contest-id-' + item} value={item.id + '' || ''}>{item.title}</Select.Option>
          ))}
        </Select>
      </div>
      {
        contest_id !== 'none' ? (
          table.length > 0 ? (
            <div>
              <Alert
                message={(
                  <span>{problemSelectInfo.team_code ? (
                    <span>当前选题情况： {problemSelectInfo.title}</span>
                  ) : '请在规定时间内完成选题'}
                  </span>)} />
            </div>
          ) : (
            <Alert
              message={(<span>暂无题目，请题目发布后再进行选题</span>)}
              description='赛事管理员暂未添加题目'
              showIcon
            />
          )
        ) : <Alert
          message={(<span>请在下拉选单中选择竞赛</span>)}
          description={(<span>如果您尚未参加过任何比赛，<Link to='/contest'> 请点此参赛</Link></span>)}
          showIcon
        />
      }
    </div>
  )
}

export default connect(({app, student}) => ({app, student}))(ProblemPage)