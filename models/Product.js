const { DataTypes } = require('sequelize');
const db = require('../db.js');

const Product = db.define("product", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(180),
        allowNull: false
    },

    image: {
        type: DataTypes.STRING(300),
        allowNull: true
    },

    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    }

});

module.exports = Product;

