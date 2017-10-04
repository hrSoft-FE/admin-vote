module.exports = {
  path: 'schoolInfo',
  getComponent (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
