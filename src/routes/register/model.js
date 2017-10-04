/**
 * Created by armor on 17-8-13.
 */
import { schoolQuery, getCode, register } from './service'
import modelExtend from 'dva-model-extend'
import { counterModel, loadingModel, tableModel } from '../../models/modelExtend'
export default modelExtend(counterModel, tableModel, loadingModel, {
  namespace: 'register',
  state: {},
  subscriptions: {
    schoolsSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        dispatch({type: 'querySchools'})
      })
    }
  },
  effects: {
    * querySchools ({}, {put, call, select}) {
      const {table = []} = yield select(({register}) => register)
      if (table.length < 1) {
        const data = yield call(schoolQuery)
        const schools = data.schools
        yield put({type: 'setTable', payload: schools})
      }
    },
    // 获取验证码
    * getCode ({payload}, {call, put}) {
      try {
        yield call(getCode, payload)
      } catch (e) {
        yield put({type: 'counterReset'})
        throw e
      }
    },
    * register ({payload}, {put, call}) {
      yield call(register, payload)
      const loginData = {
        identifier: payload.mobile,
        password: payload.password,
        client: 1
      }
      yield put({type: 'login/login', payload: loginData})
    }
  },
  reducers: {}
})