/**
 * Created by armor on 17-8-12.
 */
import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../models/modelExtend'
import { windowScroll } from '../../utils'
import { fetchPassageAll } from './service'

export default modelExtend(modalModel, tableModel, {
  namespace: 'download',
  state: {},
  subscriptions: {
    downloadSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === `/download`
        if (match) {
          windowScroll('nav-header')
          dispatch({type: 'fetchPassages'})
        }
      })
    }
  },
  effects: {
    * fetchPassages ({payload}, {call, put}) {
      const query = {
        page: 1,
        size: 10,
        type: 1
      }
      const downloads = yield call(fetchPassageAll, query)
      const data = downloads
      const tableConfig = {
        tablePage: 1,
        tableSize: 10,
        tableCount: data.count
      }
      yield put({type: 'updateModalContent', payload: data})
      yield put({type: 'setTableConfig', payload: tableConfig})
    }
  }
})