const mongoose = require("mongoose");

// Setting up environmental variables
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Setting up database
const database = async (app) => {
    try {
        const options = {
            bufferTime: 0,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 30000,
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        mongoose.connect(process.env.DB_URL, options, () => {
            console.log("Connected to database");
            app.listen(PORT, () =>
                console.log(`Server listening on localhost:${PORT}...`),
            );
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { database };
