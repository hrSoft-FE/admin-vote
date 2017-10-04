import { API, request } from '../../../utils'

const changePassword = async (data) => request({
  url: API.changePassword,
  method: 'post',
  token: true,
  data
})

const update = async (data) => request({
  url: API.updateUserInfo,
  method: 'post',
  token: true,
  data
})

export { changePassword, update }
