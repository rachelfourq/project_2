'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    wineId: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.belongsTo(models.user);
        models.favorite.hasMany(models.comment);
      }
    }
  });
  return favorite;
};