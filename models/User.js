const { DataTypes } = require("sequelize");
const db = require("../db.js");

const User = db.define("user", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    username: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true

    },

    password: {
        type: DataTypes.STRING(80),
        allowNull: false
    }

});

module.exports = User;
