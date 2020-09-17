// 此檔案作用為處理 使用者 前台餐廳相關的request
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

// restController 是一個物件
const restController = {
  // getRestaurants 是 restController 的其中一個屬性，也是個函式，負責瀏覽餐廳頁面
  getRestaurants: (req, res) => {
    // whereQuery 是要傳給 findAll 的參數，故須包裝成物件格式
    let whereQuery = {}
    // categoryId 是要放進 WhereQuery 的內容
    let categoryId = ''
    if (req.query.categoryId) {
      // req.query.categoryId 回傳值為字串，故用 Number 轉為數字格式
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }
    Restaurant.findAll({ include: Category, where: whereQuery }).then(restaurants => {
      // 因 restaurant 的資料是陣列，需搭配 map 處理，map 處理完會產生新陣列，用變數 data 接住回傳值，這時應該會寫成 const data = restaurant.map(r => {r.description = r.description.substring(0,50) return r})
      const data = restaurants.map(r => ({
        // 展開餐廳資料(sequelize 回傳值是[Restaurant {dataValues:{...}}]
        ...r.dataValues,
        // 複寫 description 內容 (substring 用來指定文字限度)
        description: r.dataValues.description.substring(0, 50),
        categoryName: r.Category.name
      }))
      Category.findAll({ raw: true, nest: true }).then(categories => {
        return res.render('restaurants', {
          restaurants: data,
          categories: categories,
          categoryId: categoryId
        })
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