const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const CacheConfig = sequelize.define('CacheConfig', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    capacity: DataTypes.NUMBER,
    replacment_policy: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'CachePolices',
            key: 'id'
        }
    },
});

module.exports = CacheConfig;
