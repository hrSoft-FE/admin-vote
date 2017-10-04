/**
 * Created by armor on 17-8-12.
 */
import { API, request } from '../../utils/index'

const fetchPassageAll = (data) => request({
  url: API.newsMessageAll,
  method: 'get',
  data
})

export { fetchPassageAll }