const express = require('express');
const { database } = require('./src/config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const redis = require('redis')

const redisClient = redis.createClient();

(async () => {
    redisClient.on('error', (err) =>{
        console.error("redis client error", err)
    })

    redisClient.on('ready', () =>{
        console.log("redis client started")
    })

    await redisClient.connect();

    await redisClient.ping()
})()

const app = express();
database(app);

// Router
const productRoutes = require('./src/api/routes/productRoute')
const userRoutes = require('./src/api/routes/userRoute')
const walletRoutes = require('./src/api/routes/walletRoute')
app.get('/', (req, res) => {
    res.send('<h2>Hello there</h2>');
}
);

// Body Parser
app.use(express.json())
app.use(cookieParser());
app.use(cors())
// Base URL
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes)

console.log('Waiting for database...')