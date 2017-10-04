/**
 * Created by armor on 17-8-16.
 */
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../models/modelExtend'
import { changePassword, updateInfo, userSchools } from './service'
import { message } from 'antd'

export default modelExtend(modalModel, tableModel, {
  namespace: 'student',
  state: {
    tablePass: [],
    tableSignUp: [],
    tableSchoolAdmins: [],
    query: {}
  },
  subscriptions: {
    studentsSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/student') {
          dispatch(routerRedux.push('/student/contest'))
        }
        const match = pathToRegexp('/student/:params').exec(pathname)
        if (match || pathname === '/student') {
          dispatch({type: 'init', payload: pathname})
        }
        if (pathname === '/student/signup') {
          dispatch({type: 'getUserSchool'})
        }
      })
    }
  },
  effects: {
    * init ({payload: pathname}, {call, select, put}) {
      let {query} = yield select(({student}) => student)
    },
    * changePassword ({payload}, {call, put, select}) {
      yield call(changePassword, payload)
      message.success('密码修改成功！')
      yield put({type: 'hideModal'})
    },
    * edit ({payload}, {call, put, select}) {
      yield call(updateInfo, payload)
      message.success('信息修改成功')
      yield put({type: 'app/query'})
      yield put({type: 'hideModal'})
    },
    * getUserSchool ({}, {call, put}) {
      try {
        const data = yield call(userSchools)
        console.log(data)
        yield put({type: 'schools', payload: data.schools})
      } catch (e) {
        yield put({tyoe: 'schools', payload: []})
      }
    }
  },
  reducers: {
    saveContests (state, {payload}) {
      return {
        ...state,
        contests: payload
      }
    },
    schools (state, {payload}) {
      return {
        ...state,
        schools: payload
      }
    },
    saveQuery (state, {payload: query}) {
      return {
        ...state,
        query
      }
    }
  }
})
