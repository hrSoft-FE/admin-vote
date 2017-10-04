import { API, request } from '../../utils'

const fetchSelectOption = async () => request({
  url: API.schoolAcquireId,
  method: 'get',
  token: true
})

export { fetchSelectOption }
