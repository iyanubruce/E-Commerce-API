const mongoose = require('mongoose');

// Setting up environmental variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Setting up database
const database = async (app) => {
    try {
        await mongoose.connect(
        process.env.DB_URL,
        () => {
            console.log('Connected to database');
            app.listen(PORT, () =>
            console.log(`Server listening on localhost:${PORT}...`)
            );
        });
    } catch(error) {
    console.log(error);
    }
};

module.exports = { database };