import modelExtend from 'dva-model-extend'
import { changePassword, update } from './service'
import { modalModel, tableModel } from '../../../models/modelExtend'

export default modelExtend(modalModel, tableModel, {
  namespace: 'schoolInfo',
  state: {},
  effects: {
    * changePassword ({payload}, {call, put}) {
      yield call(changePassword, payload)
      yield put({type: 'schoolInfo/hideModal'})
    }
  },
  * edit ({payload}, {call, put}) {
    yield call(update, payload)
    yield put({type: 'app/query'})
    yield put({type: 'schoolInfo/hideModal'})
  }
})
