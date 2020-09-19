// 此檔案作用為處理 使用者 前台餐廳相關的request
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const pageLimit = 10

// restController 是一個物件
const restController = {
  // getRestaurants 是 restController 的其中一個屬性，也是個函式，負責瀏覽餐廳頁面
  getRestaurants: (req, res) => {
    let offset = 0
    // whereQuery 是要傳給 findAll 的參數，故須包裝成物件格式
    let whereQuery = {}
    // categoryId 是要放進 WhereQuery 的內容
    let categoryId = ''
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      // req.query.categoryId 回傳值為字串，故用 Number 轉為數字格式
      categoryId = Number(req.query.categoryId)
      whereQuery['CategoryId'] = categoryId
    }
    Restaurant.findAndCountAll({ include: Category, where: whereQuery, offset: offset, limit: pageLimit }).then(result => {
      // pagination
      let page = Number(req.query.page) || 1
      let pages = Math.ceil(result.count / pageLimit)
      let totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
      let prev = page - 1 < 1 ? 1 : page - 1
      let next = page + 1 > pages ? pages : page + 1
      // 因 restaurant 的資料是陣列，需搭配 map 處理，map 處理完會產生新陣列，用變數 data 接住回傳值，這時應該會寫成 const data = restaurant.map(r => {r.description = r.description.substring(0,50) return r})
      // console.log('result', result)
      const data = result.rows.map(r => ({
        // 展開餐廳資料(sequelize 回傳值是[Restaurant {dataValues:{...}}]
        ...r.dataValues,
        // 複寫 description 內容 (substring 用來指定文字限度)
        description: r.dataValues.description.substring(0, 50),
        // 用 map 取出使用者的收藏餐廳清單 id，再用 includes 比對餐廳 id，結果會回傳布林值
        // 白話：「現在這間餐廳」是否有出現在「使用者的收藏清單」裡
        isFavorited: req.user.FavoritedRestaurants.map(d => d.id).includes(r.id),
        isLiked: req.user.LikedRestaurants.map(d => d.id).includes(r.id),
        // categoryName: r.Category.name
      }))
      Category.findAll({ raw: true, nest: true })
        .then(categories => {
          return res.render('restaurants', {
            restaurants: data,
            categories: categories,
            categoryId: categoryId,
            page: page,
            totalPage: totalPage,
            prev: prev,
            next: next
          })
        })
    })
  },
  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' },
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      restaurant.increment('viewCounts')
      // 「現在的 user」是否有出現在收藏「這間餐廳的使用者列表」裡
      const isFavorited = restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id)
      const isLiked = restaurant.LikedUsers.map(d => d.id).includes(req.user.id)
      return res.render('restaurant', {
        restaurant: restaurant.toJSON(),
        isFavorited: isFavorited,
        isLiked: isLiked
      })
    })
  },
  getFeeds: (req, res) => {
    return Restaurant.findAll({
      limit: 10,
      raw: true,
      nest: true,
      order: [['createdAt', 'DESC']],
      include: [Category]
    }).then(restaurants => {
      Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      }).then(comments => {
        return res.render('feeds', {
          restaurants: restaurants,
          comments: comments
        })
      })
    })
  }, getDashboard: (req, res) => {
    return Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [User] }
      ]
    }).then(restaurant => {
      // console.log('restaurant Json', restaurant.toJSON())
      return res.render('dashboard', {
        restaurant: restaurant.toJSON()
      })
    })
  },
  getTopRestaurant: (req, res) => {
    return Restaurant.findAll({
      include: [
        { model: User, as: 'FavoritedUsers' }
      ]
    }).then(restaurants => {
      restaurants = restaurants.map(restaurant => ({
        ...restaurant.dataValues,
        favoriteCounts: restaurant.FavoritedUsers.length,
        isFavorited: restaurant.FavoritedUsers.map(d => d.id).includes(req.user.id),
        description: restaurant.description.substring(0, 50)
      }))
      restaurants = restaurants.sort((a, b) => b.favoriteCounts - a.favoriteCounts).slice(0, 10)
      return res.render('topRestaurant', { restaurants: restaurants })
    })
  },
}
module.exports = restController