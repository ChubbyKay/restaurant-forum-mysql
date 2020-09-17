// 此檔案作用為處理 使用者 前台餐廳相關的request
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

// restController 是一個物件
const restController = {
  // getRestaurants 是 restController 的其中一個屬性
  // getRestaurants 是個函式，負責瀏覽餐廳頁面
  getRestaurants: (req, res) => {
    Restaurant.findAll({ include: Category }).then(restaurants => {
      console.log(restaurants[0])
      // 因 restaurant 的資料是陣列，需搭配 map 處理，map 處理完會產生新陣列，用變數 data 接住回傳值，這時應該會寫成 const data = restaurant.map(r => {r.description = r.description.substring(0,50) return r})
      const data = restaurants.map(r => ({
        // 展開餐廳資料(sequelize 回傳值是[Restaurant {dataValues:{...}}]
        ...r.dataValues,
        // 複寫 description 內容 (substring 用來指定文字限度)
        description: r.dataValues.description.substring(0, 50),
        categoryName: r.Category.name
      }))
      return res.render('restaurants', {
        restaurants: data
      })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: Category
    }).then(restaurant => {
      return res.render('restaurant', {
        restaurant: restaurant.toJSON()
      })
    })
  }
}
module.exports = restController