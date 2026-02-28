const mongoose = require('mongoose');
require('dotenv').config({path: './config/.env'})


mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.8vtfgun.mongodb.net/birdy",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Failed to connect to MongoDB", err));
