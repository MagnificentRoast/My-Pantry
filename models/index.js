const User = require("./User");
const Food = require("./Food");

// Define associations
User.hasMany(Food, {
    foreignKey: "user_id"
});

Food.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = {User, Food};