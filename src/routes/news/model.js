/**
 * Created by armor on 17-8-11.
 */
import { fetchPassageAll, fetchPassage } from './service'
import modelExtend from 'dva-model-extend'
import { modalModel, tableModel } from '../../models/modelExtend'
import { windowScroll } from '../../utils'
import {message} from 'antd'
import pathToRegexp from 'path-to-regexp'

export default modelExtend(modalModel, tableModel, {
  namespace: 'news',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        console.log('pathname:' + pathname)
        if (pathname === '/news') { // 如果当前页是新闻中心，则加载新闻
          windowScroll('nav-header')
          dispatch({type: 'fetchPassages'})
        } else { // 当前页是详细新闻
          const match = pathToRegexp(`/news/:id`).exec(pathname)
          console.log('match' + match)
          if (match) {
            const id = match[1]
            console.log('id:' + id)
            dispatch({type: 'fetchPassage', payload: id})
          }
        }
      })
    }
  },
  state: {},
  effects: {
    * fetchPassages ({payload = {}}, {call, select, put}) { // put触发action,call调用异步逻辑,select从state里获取数据
      const query = {
        page: 1,
        size: 10,
        type: 0
      }
      const news = yield call(fetchPassageAll, query)
      const data = news
      const tableConfig = {
        tablePage: 1,
        tableSize: 10,
        tableCount: data.count
      }
      yield put({type: 'updateModalContent', payload: data})
      yield put({type: 'setTableConfig', payload: tableConfig})
    },
    * fetchMore ({payload}, {call, select, put}) {
      const {tableSize, tableCount} = yield select(({news}) => news)
      const tableConfig = {
        tablePage: 1,
        tableSize: tableSize + 10,
        tableCount: tableCount
      }
      const query = {
        page: 1,
        size: tableSize + 10,
        type: 0
      }
      const news = yield call(fetchPassageAll, query)
      const {data} = news
      if (tableSize < tableCount) {
        yield put({type: 'updateModalContent', payload: data})
        yield put({type: 'setTableConfig', payload: tableConfig})
      } else {
        message.success('已加载全部')
      }
    },
    * fetchPassage ({payload}, {call, put}) {
      const query = {
        messageId: payload,
        type: 0
      }
      const data = yield call(fetchPassage, query)
      yield put({type: 'updateModalContent', payload: data})
    }
  }
})