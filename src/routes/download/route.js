/**
 * Created by armor on 17-8-12.
 */
module.exports = {
  path: 'download',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
