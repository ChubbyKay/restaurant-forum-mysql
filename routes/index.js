let routes = require('./routes')
let apis = require('./apis')

// 將路由分為 / 及 /api
// 此 app 為 app.js 的最後一行參數，即代表 express 專案本身
module.exports = (app) => {
  app.use('/', routes)
  app.use('/api', apis)
}