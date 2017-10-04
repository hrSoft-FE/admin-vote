/**
 * Created by armor on 17-8-16.
 */
import React from 'react'
import { connect } from 'dva'
import { Button, Col, Form, Row } from 'antd'
import FormItemRender from '../../../components/FormItemRender/index'
import { userConfig } from '../signup/formConfig'

const FormItem = Form.Item
const StudentPage = ({app, location, student, form: {getFieldDecorator, validateFieldsAndScroll}}) => {
  const {query} = location
  let {user} = app
  const {schools} = student
  const onSubmitClick = e => {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const {email, member2, member3, name, mobile, schoolId, teacher, teamName} = values
      let schoolName = '', schoolLevel = ''
      schools.forEach(item => {
        if (item.id === +schoolId) {
          schoolName = item.name
          schoolLevel = item.level
        }
      })
      const body = {
        email,
        member2,
        member3,
        mobile,
        teamName,
        member1: name,
        contestId: query.contest_id,
        teacher,
        schoolId,
        schoolName,
        schoolLevel
      }
      console.log(body)
    })
  }
  const schoolOptions = schools.map(config => {
    return {
      value: config.id + '',
      label: config.name,
      level: config.level
    }
  })
  return (
    <div className='sign-up'>
      <Form className='form-content'>
        <Row className='sign-up-header'>
          <Col offset={6}>
            <h2>{query.signed ? '修改:' : '报名:'}{query.title}</h2>
          </Col>
        </Row>
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
            options: schoolOptions,
            disabled: true
          }, getFieldDecorator, {initialValue: user['school_id'] + ''})
        }
        {userConfig.map(config => FormItemRender(config, getFieldDecorator, {initialValue: user[config.value]}))}
        <FormItem>
          <Row>
            <Col offset={6}>
              <Button
                type='primary' className='student-submit-button'
                onClick={onSubmitClick}>{query.signed ? '修改' : '报名'}</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
  )
}

export default connect(({app, student}) => ({app, student}))(Form.create()(StudentPage))