const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Food extends Model {}

Food.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        food_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
                isAlpha: true,
                isNumeric: false
            }
        },
        pantry_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "pantry",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "food"
    }
)

module.exports = Food;