'use strict'
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    opening_hours: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {})
  Restaurant.associate = function (models) {
    // associations can be defined here
    Restaurant.belongsTo(models.Category)
    Restaurant.hasMany(models.Comment)
  }
  return Restaurant
}

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Restaurant extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Restaurant.associate = function (models) {
//         Restaurant.belongsTo(models.Category)
//       }
//     }
//   };
//   Restaurant.init({
//     name: DataTypes.STRING,
//     tel: DataTypes.STRING,
//     address: DataTypes.STRING,
//     opening_hours: DataTypes.STRING,
//     description: DataTypes.TEXT,
//     image: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Restaurant',
//   });
//   return Restaurant;
// };