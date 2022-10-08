const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const CacheStatistics = sequelize.define('CacheStatistics', {
    statistic: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    value: DataTypes.STRING,
});

module.exports = CacheStatistics;
