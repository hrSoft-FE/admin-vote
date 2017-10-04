/**
 * Created by armor on 17-8-13.
 */
import React from 'react'
import { connect } from 'dva'
import { config } from '../../utils/index'
import formConfig from './formConfig'
import CountUp from 'react-countup'
import FormItemRender from '../../components/FormItemRender/index'
import './index.less'
import { Button, Col, Form, Input, Row } from 'antd'
const FormItem = Form.Item

const Register = ({register, dispatch, form: {getFieldDecorator, getFieldValue, validateFieldsAndScroll}}) => {
  const {counter, loading, table: schools} = register
  const schoolOptions = schools.map(config => {
    return {
      value: config.id + '',
      label: config.name,
      level: config.level
    }
  })
  const extra = {
    formItemLayout: {
      labelCol: {span: 24},
      wrapperCol: {span: 24}
    }
  }
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('两次输入的密码不一致！')
    } else {
      callback()
    }
  }
  const counterStart = (e) => {
    e.preventDefault()
    const data = {
      mobile: getFieldValue('mobile')
    }
    dispatch({type: 'register/getCode', payload: data})
    dispatch({type: 'register/counterStart'})
    setTimeout(() => {
      dispatch({type: 'counterReset'})
    }, 60000)
  }
  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      let schoolName = ''
      schoolOptions.forEach(item => {
        if (item.value === values.schoolId) {
          schoolName = item.label
        }
      })
      values = {
        ...values,
        schoolName,
        passwordConfirmation: undefined
      }
      dispatch({type: 'register/register', payload: values})
    })
  }
  return (
    <div className='register-wrapper'>
      <div className='form'>
        <div className='login-title'>
          <span>{config.name}</span>
        </div>
        <Form>
          {
            FormItemRender({
              value: 'schoolId',
              label: '学校',
              formType: 2,
              contentType: 'string',
              rules: {
                required: true,
                requiredMessage: '请选择您所在的学校'
              },
              options: schoolOptions
            }, getFieldDecorator, extra)
          }
          {formConfig.map(config => FormItemRender(config, getFieldDecorator, extra))}
          <FormItem
            label='确认密码'
            hasFeedback // 展示校验状态图标
            key='register-check-password'>
            {getFieldDecorator('passwordConfirmation', {
              rules: [{
                required: true, message: '与上一次密码不一致'
              }, {
                validator: checkPassword
              }]
            })(
              <Input type='password' />
            )}
          </FormItem>
          <FormItem
            label='验证码'
          >
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('code', {
                  rules: [{required: true, message: '请输入你获取到的验证码'}]
                })(
                  <Input size='large' />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size='large' disabled={counter}
                  onClick={counterStart}>
                  {counter ? (
                    <CountUp
                      start={60}
                      end={0}
                      useEasing={false}
                      duration={60}
                    />
                  ) : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          <Button type='primary' size='large' onClick={handleOk} loading={loading}>
            注册
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default connect(({register}) => ({register}))(Form.create()(Register))