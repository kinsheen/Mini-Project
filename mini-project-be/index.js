const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const authRoutes = require("./routes/auth.routes");
const toDoRoute = require("./routes/to-do.route");
const userRoute = require("./routes/user.route");

require("./config/database")
require("./config/association")
require("dotenv").config();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/to-do", toDoRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({ message: 'Something went wrong.'})
})

app.listen(port, () =>
  console.log(`app listening on port ${port}!`))



