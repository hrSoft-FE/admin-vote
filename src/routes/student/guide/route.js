/**
 * Created by armor on 17-8-16.
 */
module.exports = {
  path: 'guide',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
