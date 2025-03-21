const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000; // Fallback port

// ✅ Import routes
const authRoutes = require("./routes/auth.routes");
const toDoRoute = require("./routes/to-do.route");
const userRoute = require("./routes/user.route");

// ✅ Database & Associations
require("./config/database");
require("./config/association");

// ✅ CORS allowed domains
const allowedOrigins = [
  "http://localhost:5173",
  "https://clint.mlhuillier.net"
];

// ✅ Middleware
app.use(cookieParser());
app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/to-do", toDoRoute);
app.use("/api/user", userRoute);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running successfully!");
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(err.status || 500).json({ message: err.message || "Something went wrong." });
});

// ✅ Start server
app.listen(3101, '0.0.0.0', () => {
  console.log('Server is running on port 3101');
});
