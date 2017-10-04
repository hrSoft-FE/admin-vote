/**
 * Created by armor on 17-8-16.
 */
module.exports = {
  path: 'studentInfo',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}