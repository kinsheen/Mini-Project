const express = require("express");
const pool = require('./database')
const cors = require("cors");
const toDoRoute = require("./routes/to-do.route");
const achievementRoute = require("./routes/achievement.route");
const app = express();
const port = 3000;

// middleware
app.use(cors({ origin: "*" }));
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/to-do", toDoRoute);
app.use("/api/achievements", achievementRoute);

// global error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).json({ message: 'Something went wrong.'})
})

pool.query('SELECT 1')
    .then(() => {
      app.listen(port, () =>
        console.log(`app listening on port ${port}!`))
    })
    .catch(err => console.log('db connection failed. \n ' + err))

