import React from 'react'
import { connect } from 'dva'
import Sider from '../../components/Layout/Sider'
import './index.less'

const SchoolPage = ({app, location, children, school: {query, menus}}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menus} location={location} query={query} app={app} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({app, school}) => ({app, school}))(SchoolPage)
