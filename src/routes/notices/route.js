module.exports = {
  path: 'notices',
  childRoutes: [
    require('./noticesCardContent/route')
  ],
  getComponents (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
