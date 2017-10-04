module.export = {
  path: 'guide',
  getComponent (nextState, callback) {
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
