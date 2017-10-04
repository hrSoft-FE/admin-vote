/**
 * Created by armor on 17-8-16.
 */
module.exports = {
  path: 'signup',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}