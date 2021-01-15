'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Job.init({
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    phones: DataTypes.STRING,
    emails: DataTypes.STRING,
    timezone: DataTypes.STRING,
    url: DataTypes.STRING,
    method: DataTypes.STRING,
    request_interval_seconds: DataTypes.INTEGER,
    tolerated_failures: DataTypes.INTEGER,
    created: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};