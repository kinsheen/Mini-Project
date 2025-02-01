const express = require('express')
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route');
const toDoRoute = require('./routes/to-do.route');

const app = express()

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use('/api/products', productRoute);
app.use('/api/to-do', toDoRoute);

const port = 3000

app.get('/', (req, res) =>
    res.send('Hello World Updated!')
)



mongoose
    .connect("mongodb+srv://dbUser123:dbUserPassword123@mini-project-backend-db.xotgp.mongodb.net/?retryWrites=true&w=majority&appName=mini-project-backend-db")
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    })
    .catch(err => console.error('Could not connect to MongoDB', err));