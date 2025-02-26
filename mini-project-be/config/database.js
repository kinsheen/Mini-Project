const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// ✅ Initialize Sequelize with MySQL
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE, // Database Name
    process.env.MYSQL_USER, // Database User
    process.env.MYSQL_PASSWORD, // Database Password
    {
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
        dialectModule: mysql2,
        logging: false, // Disable logging SQL queries (optional)
        pool: {
            max: 10, // Max connections
            min: 0,  // Min connections
            acquire: 30000, // Timeout before error
            idle: 10000, // Release connection after inactivity
        },
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connection established successfully.");
        await sequelize.sync({ force: false }); // Set to `true` if you want to drop & recreate tables
        console.log("✅ Models are synchronized with the database.");
    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1); // Stop the server if DB fails
    } 
  })();

  process.on("SIGINT", async () => {
    console.log("❗ Closing database connection...");
    await sequelize.close();
    console.log("✅ Database connection closed.");
    process.exit(0);
});

module.exports = { sequelize };
