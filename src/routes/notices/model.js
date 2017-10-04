/**
 * Created by Pororo on 17/7/20.
 */
import modelExtend from 'dva-model-extend'
import { fetchPassagesAll, fetchPassage } from './services'
import { message } from 'antd'
import { modalModel, tableModel } from '../../models/modelExtend'
import pathToRegexp from 'path-to-regexp'
import { windowScroll } from '../../utils'

export default modelExtend(modalModel, tableModel, {
  namespace: 'notice',
  state: {},
  subscriptions: {
    contestSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathname === `/notices`
        const matchNext = pathToRegexp(`/notices/:id`).exec(pathname)
        console.log(matchNext)
        if (match) {
          windowScroll('nav-header')
          dispatch({type: 'fetchPassages'})
        }
        if (matchNext) {
          const id = matchNext[1]
          dispatch({type: 'fetchPassage', payload: id})
        }
      })
    },
  },
  effects: {
    * fetchPassages ({payload}, {call, put}) {
      const query = {
        page: 1,
        size: 10,
        type: 1,
      }
      const news = yield call(fetchPassagesAll, query)
      const data = news
      console.log(data)
      const tableConfig = {
        tablePage: 1,
        tableSize: 10,
        tableCount: data.count,
      }
      yield put({type: 'updateModalContent', payload: data})
      yield put({type: 'setTableConfig', payload: tableConfig})
    },
    * fetchMore ({payload}, {call, put, select}) {
      const {tableSize, tableCount} = yield select(({notice}) => notice)
      const tableConfig = {
        tablePage: 1,
        tableSize: tableSize + 10,
        tableCount: tableCount,
      }
      const query = {
        page: 1,
        size: tableSize + 10,
        type: 1,
      }
      const news = yield call(fetchPassagesAll, query)
      const {data} = news
      if (tableSize < tableCount) {
        yield put({type: 'setTableConfig', payload: tableConfig})
        yield put({type: 'updateModalContent', payload: data})
      } else {
        message.success('已全部加载完毕')
      }
    },
    * fetchPassage ({payload}, {call, put}) {
      const query = {
        messageId: payload,
        type: 0,
      }
      const data = yield call(fetchPassage, query)
      // console.log(data)
      yield put({type: 'updateModalContent', payload: data})
    }
  }
})
