'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    RestaurantId: DataTypes.INTEGER
  }, {})
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Restaurant)
    Comment.belongsTo(models.User)
  }
  return Comment
}


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Comment.belongsTo(models, Restaurant)
//       Comment.belongsTo(models, User)
//     }
//   };
//   Comment.init({
//     text: DataTypes.STRING,
//     UserId: DataTypes.INTEGER,
//     RestaurantId: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };