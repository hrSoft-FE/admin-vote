/**
 * Created by armor on 17-8-16.
 */
import { API, request } from '../../utils'

const changePassword = async (data) => request({
  url: API.changePassword,
  method: 'post',
  token: true,
  data
})

const updateInfo = async (data) => request({
  url: API.updateUserInfo,
  method: 'post',
  token: true,
  data
})

const fetchTablePass = async (data) => request({
  url: API.getAllPassContest,
  method: 'get',
  token: true
})

const fetchContestPro = async (id) => request({
  url: API.getContestProblemList.replace(':id', id),
  method: 'get',
  token: true
})

const updateContestPro = async (data) => request({
  url: API.updateContestProblemSelect,
  method: 'get',
  token: true,
  data
})
const fetchTable = async (data) => request({
  url: API.getAllContest,
  method: 'get',
  token: true
})
const fetchTablePro = async (id) => request({
  url: API.getContestProblemList.replace(':id', id),
  method: 'get',
  token: true
})

const fetchTableSchoolAdmins = async (data) => request({
  url: API.getSchoolAdmins,
  method: 'get',
  token: true
})

const fetchTableSignUp = async (data) => request({
  url: API.signedUpContests,
  method: 'get',
  token: true
})

const userSchools = async () => request({
  url: API.userSchools,
  method: 'get',
  token: false
})
export { changePassword, updateContestPro, updateInfo, fetchTable, fetchTablePass, fetchContestPro, fetchTableSchoolAdmins, fetchTableSignUp, userSchools, fetchTablePro }