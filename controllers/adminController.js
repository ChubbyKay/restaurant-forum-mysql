const fs = require('fs')
const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const adminService = require('../services/adminService')
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID


const adminController = {
  // 執行 getRestaurants 時，呼叫 adminService 執行，並設下參數 data 作為 adminService callback 回傳的資料
  // data 是叫 adminService 執行 callback function , adminService 執行完回傳的 callback ，會傳入 adminController 的 data
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', {
        categories: categories
      })
    })
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },

  // postRestaurant: (req, res) => {
  // if (!req.body.name) {
  //   req.flash('error_messages', "name didn't exist")
  //   return res.redirect('back')
  // }

  // const { file } = req
  // if (file) {
  //   imgur.setClientID(IMGUR_CLIENT_ID)
  //   imgur.upload(file.path, (err, img) => {
  //     return Restaurant.create({
  //       name: req.body.name,
  //       tel: req.body.tel,
  //       address: req.body.address,
  //       opening_hours: req.body.opening_hours,
  //       description: req.body.description,
  //       image: file ? img.data.link : null,
  //       CategoryId: req.body.categoryId
  //     }).then((restaurant) => {
  //       req.flash('success_messages', 'restaurant was successfully created')
  //       return res.redirect('/admin/restaurants')
  //     })
  //   })
  // } else {
  //   return Restaurant.create({
  //     name: req.body.name,
  //     tel: req.body.tel,
  //     address: req.body.address,
  //     opening_hours: req.body.opening_hours,
  //     description: req.body.description,
  //     image: null,
  //     CategoryId: req.body.categoryId
  //   }).then((restaurant) => {
  //     req.flash('success_messages', 'restaurant was successfully created')
  //     return res.redirect('/admin/restaurants')
  //   })
  // }
  // },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      return res.render('admin/restaurant', data)
    })
  },
  editRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        return res.render('admin/create', {
          categories: categories,
          restaurant: restaurant.toJSON()
        })
      })
    })
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    return User.findAll({ raw: true }).then(users => {
      return res.render('admin/users', { users: users })
    })
  },
  putUsers: (req, res) => {
    return User.findByPk(req.params.id)
      .then((user) => {
        if (user.isAdmin) {
          user.update({ isAdmin: false })
            .then(() => {
              req.flash('success_messages', 'user was successfully to update')
              res.redirect('/admin/users')
            })
        } else {
          user.update({ isAdmin: true })
            .then(() => {
              req.flash('success_messages', 'user was successfully to update')
              res.redirect('/admin/users')
            })
        }
      })
  }
}
module.exports = adminController
