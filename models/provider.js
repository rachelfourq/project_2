'use strict';
module.exports = function(sequelize, DataTypes) {
  var provider = sequelize.define('provider', {
    pid: DataTypes.STRING,
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.provider.belongsTo(models.user);
      }
    }
  });
  return provider;
};