/**
 * Created by armor on 17-8-13.
 */
import { API, request } from '../../utils'

const login = async (data, role) => {
  let url = API.login
  if (role === 'admin') {
    url = API.adminLogin
  }
  return request({
    url: url,
    method: 'post',
    data,
  })
}

const schoolQuery = async () => request({
  url: API.userSchools,
  method: 'get',
})

export { login, schoolQuery }
