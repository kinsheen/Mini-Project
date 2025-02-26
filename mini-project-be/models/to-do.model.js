const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model")

class Todo extends Model {}

// Initialize the Todo model
Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING, //
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        note: {
            type: DataTypes.TEXT, // Allows longer text
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        sequelize,
        modelName: "Todo",
        tableName: "todo", // Changed from "todo" for consistency
        timestamps: true,
    }
);

module.exports = Todo;
