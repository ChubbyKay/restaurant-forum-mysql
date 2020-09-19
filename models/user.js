'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment)
    User.belongsToMany(models.Restaurant, {
      through: models.Favorite,
      foreignKey: 'UserId',
      as: 'FavoritedRestaurants'
    })
    User.belongsToMany(models.Restaurant, {
      through: models.Like,
      foreignKey: 'UserId',
      as: 'LikedRestaurants'
    })
    // User 的追蹤者(誰追蹤你)
    User.belongsToMany(User, {
      // 把現在的 user.id 對應到 Followship 裡的 followingId，並命名其為 Followers
      // 白話：若 UserId 是 5 ，找出所有 followingId 是 5 的人，就是我的 follower
      through: models.Followship,
      foreignKey: 'followingId',
      // Followers 可讓 control 和 view 撈到資料
      as: 'Followers'
    })
    // User 追蹤中的 User(你追蹤誰)
    // 白話：若 UserId 是 5 ，找出所有 followerId 是 5 的人，就是我在 following 的人
    User.belongsToMany(User, {
      through: models.Followship,
      foreignKey: 'followerId',
      as: 'Followings'
    })
  }
  return User
}

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       User.hasMany(models.comment)
//     }
//   };
//   User.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     isAdmin: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };