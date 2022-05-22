const express = require('express');
const { database } = require('./src/config/database');
const cookieParser = require('cookie-parser');

const app = express();
database(app);

// Router
const productRoutes = require('./src/api/routes/productRoute')
const userRoutes = require('./src/api/routes/userRoute')

app.get('/', (req, res) => {
    res.send('<h2>Hello there</h2>');
});

// Body Parser
app.use(express.json())
app.use(cookieParser());
// Base URL
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);

console.log('Waiting for database...')