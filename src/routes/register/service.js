/**
 * Created by armor on 17-8-13.
 */
import { API, request } from '../../utils/index'

const register = async data => request({
  url: API.register,
  method: 'post',
  data
})

/**
 * 获取系统的学校列表
 */
const schoolQuery = async () => request({
  url: API.userSchools,
  method: 'get'
})

/**
 * 获取验证码
 * @param data
 */
const getCode = async data => request({
  url: API.preRegister,
  method: 'get',
  data
})

export { register, schoolQuery, getCode }