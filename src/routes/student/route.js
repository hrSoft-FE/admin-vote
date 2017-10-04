/**
 * Created by armor on 17-8-16.
 */
module.exports = {
  path: 'student',
  childRoutes: [
    require('./guide/route'),
    require('./problem/route'),
    require('./studentInfo/route'),
    require('./contest/route'),
    require('./score/route'),
    require('./signup/route')
  ],
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
