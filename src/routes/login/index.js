/**
 * Created by armor on 17-8-13.
 */
import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import PropTypes from 'prop-types'
import { verify } from '../../utils/'
import './index.less'
import { Button, Form, Icon, Input } from 'antd'

const FormItem = Form.Item

const Login = ({login, dispatch, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const bg = `url("http://ou77rcnh8.bkt.clouddn.com/static/login-bg.jpg")`
  const {loading} = login
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      console.log('values:' + values)
      dispatch({type: 'login/login', payload: values})
    })
  }
  return (
    <div className='login-wrapper' style={{backgroundImage: bg}}>
      <div className='form'>
        <div className='login-title'>
          <span className='login-title-main'>全国大学生电子设计竞赛</span>
          <span className='login-title-sub'>河北赛区</span>
        </div>
        <Form>
          <FormItem hasFeedback>
            {getFieldDecorator('identifier', {
              rules: [{
                pattern: verify.identifier, message: '请输入有效的手机号'
              }, {
                required: true, message: '请输入手机号'
              }]
            })(
              <Input prefix={<Icon type='user' />} placeholder='手机号' />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                pattern: verify.password, message: '请输入有效的密码（6-18位）'
              }, {
                required: true, message: '请输入密码！'
              }]
            })(
              <Input prefix={<Icon type='lock' />} type='password' onPressEnter={handleOk} placeholder='密码' />
            )}
          </FormItem>
          <Button type='primary' size='large' onClick={handleOk} loading={loading}>
            登录
          </Button>
        </Form>
        <div className='login-footer'>
          <Link to={'/register'}>
            <span>注册账号</span>
          </Link>
          <Link to={'/forget'}>
            <span className='login-form-forgot'>忘记密码</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func
}

export default connect(({login}) => ({login}))(Form.create()(Login))