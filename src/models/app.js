import { query } from '../services/app'
import { sleep } from '../utils'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
export default {
  namespace: 'app',
  state: {
    user: JSON.parse(window.localStorage.getItem('nuedcUser') || '{}'),
    token: window.localStorage.getItem('nuedcToken') || '',
    role: window.localStorage.getItem('nuedcRole') || 'student',
    query: {},
    nobg: ['/', '/home', '/login', '/news/:id', '/notices/:id']
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const role = window.localStorage.getItem('nuedcRole')
        const match = pathToRegexp(`/${role}/:params`).exec(pathname)
        if (!!match || pathname === `/${role}`) {
          !!window.localStorage.getItem('nuedcToken') && dispatch({type: 'query'})
        }
      })
    }
  },
  effects: {
    * query ({}, {call, put, select}) {
      try  {
        const user = yield call(query)
        yield put({type: 'setUser', payload: user})
      } catch (e) {
        yield call(sleep, 1000)
        yield put({type: 'login/logout'})
        yield put({type: 'setInfo', payload: {token: '', role: 'student'}})
        throw e
      }
    },
    * userLogout ({}, {put}) {
      window.localStorage.removeItem('nuedcToken')
      window.localStorage.removeItem('nuedcRole')
      window.localStorage.removeItem('nuedcUser')
      yield put({type: 'logout'})
      yield put(routerRedux.push('/'))
    },
  },
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    logout (state) {
      return {
        ...state,
        user: {}
      }
    },
    setInfo (state, {payload: {token, role}}) {
      return {
        ...state,
        token,
        role
      }
    },
    setUser (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    saveQuery (state, {payload}) {
      const query = {
        ...state.query,
        payload
      }
      return {
        ...state,
        query
      }
    }
  }
}
