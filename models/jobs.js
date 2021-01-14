'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Jobs.init({
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    timezone: DataTypes.STRING,
    request_interval_seconds: DataTypes.INTEGER,
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
    tolerated_failures: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Jobs',
  });
  return Jobs;
};