const User = require("./User");
const Food = require("./Food");
const Pantry = require("./Pantry");

// Define associations
User.hasOne(Pantry, {
    foreignKey: "user_id"
});

Pantry.belongsTo(User, {
    foreignKey: "user_id"
});

Pantry.hasMany(Food, {
    foreignKey: "pantry_id"
});

Food.belongsTo(Pantry, {
    foreignKey: "pantry_id"
});

module.exports = {User, Food, Pantry};