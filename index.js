const express = require('express');
const app = express();

const { database } = require('./src/config/database');
database(app);

// Router
const productRoutes = require('./src/api/routes/productRoute')

// app.get('/', (req, res) => {
//     res.send('<h1>Yours Only </h1>')
// })
// Body Parser
app.use(express.json())
// Base URL
app.use('/', productRoutes); 

console.log('Waiting for database...')