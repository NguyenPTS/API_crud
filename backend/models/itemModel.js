const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Item = sequelize.define("Item", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
    disable: { type: DataTypes.BOOLEAN, defaultValue: false } // Thêm cột ẩn
}, {
    paranoid: true, // Bật soft delete
    timestamps: true,
    deletedAt: "deletedAt",
});

module.exports = Item;
