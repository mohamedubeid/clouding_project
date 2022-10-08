const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const CacheConfig = sequelize.define('CacheConfig', {
    config: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    parameter: DataTypes.STRING,
});

module.exports = CacheConfig;
