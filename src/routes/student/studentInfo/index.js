/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import { connect } from 'dva'
import * as config from './formConfig'
import { Button, Form, Icon, Modal } from 'antd'
import PropTypes from 'prop-types'
import FormItemRender from '../../../components/FormItemRender'
import './index.less'

const StudentInfoPage = ({app, student, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {user} = app
  const {modal = false} = student
  const onModalOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      if (values.oldPassword) {
        dispatch({type: 'student/changePassword', payload: values})
      } else {
        dispatch({type: 'student/edit', payload: values})
      }
    })
  }
  const infoFormRender = (item) => {
    const {value, label, disabled = false} = item
    return (
      <div className='student-info-item' key={value}>
        <span>{label}</span>
        <span>: {user[value]}{!disabled &&
        <Icon onClick={() => dispatch({type: 'student/showModal', payload: value})}
          style={{fontSize: 16}} type='edit' />}</span>
      </div>
    )
  }
  return (
    <div className='student-info-wrapper'>
      {config.showConfig.map((item, index) => infoFormRender(item))}
      <Button type='primary' className='student-info-button'
        onClick={() => { dispatch({type: 'student/showModal', payload: 'password'}) }}>
        修改密码
      </Button>
      <Modal
        title='修改信息'
        visible={modal}
        onCancel={() => dispatch({type: 'student/hideModal'})}
        onOk={onModalOk}
        key={modal}>
        <Form className='form-content'>
          {modal && config[modal].map(config => FormItemRender(config, getFieldDecorator, {initialValue: user[config.value]}))}
        </Form>
      </Modal>
    </div>
  )
}

StudentInfoPage.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({app, student}) => ({app, student}))(Form.create()(StudentInfoPage))