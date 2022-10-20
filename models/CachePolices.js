const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const CachePolices = sequelize.define('CachePolices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
});

module.exports = CachePolices;
