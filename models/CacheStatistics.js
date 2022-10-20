const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const CacheStatistics = sequelize.define('CacheStatistics', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    number_of_items: DataTypes.INTEGER,
    size: DataTypes.NUMBER,
    num_of_requests: DataTypes.NUMBER,
    miss_rate: DataTypes.NUMBER,
    hit_rate: DataTypes.NUMBER
});

module.exports = CacheStatistics;
