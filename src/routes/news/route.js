/**
 * Created by armor on 17-8-11.
 */
module.exports = {
  path: 'news',
  childRoutes: [
    require('./NewsContent/route')
  ],
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
