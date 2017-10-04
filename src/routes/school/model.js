import pathToRegexp from 'path-to-regexp'
import { fetchSelectOption } from './service'
import { routerRedux } from 'dva/router'
import { menus } from './config'

export default {
  namespace: 'school',
  state: {
    contests: [],
    query: {},
    menus
  },
  subscriptions: {
    schoolSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/school') {
          dispatch(routerRedux.push('/school/schoolInfo'))
        }
        const match = pathToRegexp('/school/:params').exec(pathname)
        if (match || pathname === '/school') {
          dispatch({type: 'initQuery'})
        }
      })
    }
  },
  effects: {
    * initQuery ({payload}, {call, select, put}) {
      const {contests, query} = yield select(({school}) => school)
      if (JSON.stringify(query).length <= 2) {
        if (contests.length === 0) {
          const data = {} = yield call(fetchSelectOption)
          const {contests = [{id: 'none'}]} = data
          const defaultValue = contests[contests.length - 1] || {id: 'none'}
          const problem = {
            contest_id: defaultValue.id,
          }
          const query = {problem, joinedTeams: problem, schoolResult: problem}
          yield put({type: 'saveContests', payload: contests.reverse()})
          yield put({type: 'saveQuery', payload: query})
        }
      }
    }
  },
  reducers: {
    saveContests (state, {payload}) {
      return {
        ...state,
        contests: payload,
      }
    },
    saveQuery (state, {payload: query}) {
      return {
        ...state,
        query,
      }
    },
  },
}
