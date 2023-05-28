const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Successfully connected to database');
    } catch (error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
};

module.exports = connectDB;
