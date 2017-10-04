module.exports = {
  path: 'school',
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    }, 'school.chunk')
  },
  childRoutes: [
    require('./schoolInfo/route'),
    require('./guide/route')
  ]
}
