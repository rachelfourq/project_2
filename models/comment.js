'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    text: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.user);
        models.comment.belongsTo(models.favorite);
      }
    }
  });
  return comment;
};