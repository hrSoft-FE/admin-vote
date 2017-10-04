import React from 'react'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {

  if (!(app._models.filter(m => m.namespace === model.namespace).length ===
    1)) {
    app.model(model)
  }
}
const registerModelByPath = (app, pathname) => {
  const routersArr = []
  location.pathname.split('/').reduce((routers, route) => {
    routersArr.push(routers + '/' + route)
    return routers + '/' + route
  })
  routersArr.forEach((router) => {
    try {
      const model = require(`./routes${router}/model.js`)
      registerModel(app, model)
    } catch (e) {}
  })
}

const Routers = ({history, app}) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute ({location}, cb) {
        const model = require(`./routes/home/model.js`)

        registerModel(app, model)
        cb(null, {component: require('./routes/home')})
      },
      getChildRoutes ({location}, cb) {
        registerModelByPath(app, location.pathname)
        cb(null, (r => {
          return r.keys().map(key => r(key))
        })(require.context('./', true,
          /^\.\/routes\/((?!\/)[\s\S])+\/route\.js$/)))
      }
    },
    {
      path: '*',
      component: require('./routes/404')
    }]

  return <Router history={history} routes={routes} />
}

export default Routers
