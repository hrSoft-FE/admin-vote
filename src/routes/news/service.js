/**
 * Created by armor on 17-8-11.
 */
import { API, request } from '../../utils/index'

const fetchPassageAll = (data) => request({
  url: API.newsMessageAll,
  method: 'get',
  data
})

const fetchPassage = (data) => request({
  url: API.newsPassage,
  method: 'get',
  data
})

export { fetchPassageAll, fetchPassage }