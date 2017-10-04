/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import { connect } from 'dva'
import Sider from '../../components/Layout/Sider'
import './index.less'
import menuConfig from './config/menu.json'

const StudentPage = ({student, location, children}) => (
  <div className='main-wrapper'>
    <sider className='sider light'>
      <Sider menuConfig={menuConfig.menus} location={location} query={student.query} />
    </sider>
    <div className='main-container'>
      {children}
    </div>
  </div>
)

export default connect(({student}) => ({student}))(StudentPage)