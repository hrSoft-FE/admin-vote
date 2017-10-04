/**
 * Created by armor on 17-8-11.
 */
module.exports = {
  path: ':id',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}