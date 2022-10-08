const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const Image = sequelize.define('Image', {
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    path: DataTypes.STRING,
});

module.exports = Image;
