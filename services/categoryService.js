const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: (req, res, callback) => {
    return Category.findAll({ raw: true, nest: true }).then(categories => {
      if (req.params.id) {
        Category.findByPk(req.params.id)
          .then((category) => {
            callback({ categories: categories, category: category.toJSON() })
          })
      } else {
        return callback({ categories: categories })
      }
    })
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({ status: 'success', message: 'category was successfully to created' })
        })
    }
  },
  putCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.findByPk(req.params.id)
        .then((category) => {
          category.update(req.body)
            .then((category) => {
              callback({ status: 'success', message: 'category was successfully to updated' })
            })
        })
    }
  },
  deleteCategory: (req, res, callback) => {
    return Category.findByPk(req.params.id)
      .then((category) => {
        category.destroy()
          .then((category) => {
            callback({ status: 'success', message: '' })
          })
      })
  }
}

module.exports = categoryService