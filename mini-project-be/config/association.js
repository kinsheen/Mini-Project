const User = require("../models/user.model");
const Todo = require("../models/to-do.model");

// Define associations
User.hasMany(Todo, { foreignKey: "userId", as: "todos" });
Todo.belongsTo(User, { foreignKey: "userId", as: "user" });

// Export for better structure (optional)
module.exports = { User, Todo };
