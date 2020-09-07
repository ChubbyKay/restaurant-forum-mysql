const restController = require('../controllers/restController')
const adminController = require('../controllers/adminController')

module.exports = app => {
  // 瀏覽首頁會導入 restaurants 的頁面
  app.get('/', (req, res) => res.redirect('restaurants'))
  // 瀏覽 /restaurants 的頁面，則交由 restController.getRestaurants 處理
  app.get('/restaurants', restController.getRestaurants)

  // admin 的路由設定
  app.get('/admin', (req, res) => res.redirect('/admin/restaurants'))
  app.get('/admin/restaurants', adminController.getRestaurants)
}


