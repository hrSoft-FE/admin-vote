/**
 * Created by armor on 17-8-13.
 */
import modelExtend from 'dva-model-extend'
import { login, schoolQuery } from './service'
import { sleep } from '../../utils'
import { routerRedux } from 'dva/router'
import {
  counterModel,
  loadingModel,
  tableModel,
} from '../../models/modelExtend'

export default modelExtend(counterModel, tableModel, loadingModel, {
  namespace: 'login',
  state: {
    role: ''
  },
  subscriptions: {
    schoolsSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        dispatch({type: 'querySchools'})
        if (pathname === '/login') {
          dispatch({type: 'roleChange', payload: 'student'})
        }
      })
    },
  },
  effects: {
    * login ({payload}, {put, call, select}) {
      yield put({type: 'showLoading'})
      const {role = 'student'} = yield select(({login}) => login)
      yield sleep(1000)
      yield put({type: 'hideLoading'})
      try {
        const data = yield call(login, payload, role)
        const {token, user} = data
        if (user.role === 'school_admin') {
          user.role = 'school'
        }
        window.localStorage.setItem('nuedcToken', token)
        window.localStorage.setItem('nuedcUser', JSON.stringify(user))
        window.localStorage.setItem('nuedcRole', user.role)
        yield put({type: 'app/setUser', payload: user})
        yield put(
          {type: 'app/setInfo', payload: {token: token, role: user.role}})
        yield put(routerRedux.push('/' + user.role))
      } catch (e) {
        window.localStorage.removeItem('nuedcToken')
        window.localStorage.removeItem('nuedcRole')
        window.localStorage.removeItem('nuedcUser')
        yield put({type: 'app/setUser', payload: {}})
        yield put({type: 'app/setInfo', payload: {}})
        throw e
      }
    },
    * logout ({}, {put}) {
      window.localStorage.removeItem('nuedcToken')
      window.localStorage.removeItem('nuedcRole')
      window.localStorage.removeItem('nuedcUser')
      yield put({type: 'app/logout'})
      yield put(routerRedux.push('/'))
    },
    * querySchools ({}, {put, call, select}) {
      const {table = []} = yield select(({login}) => login)
      if (table.length < 1) {
        const data = yield call(schoolQuery)
        yield put({type: 'setTable', payload: data.schools})
      }
    },
  },
  reducers: {
    roleChange (state, {payload: role}) {
      return {
        ...state,
        role
      }
    }
  }
})
