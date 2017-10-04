/**
 * Created by armor on 17-8-13.
 */
module.exports = {
  path: 'login',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
