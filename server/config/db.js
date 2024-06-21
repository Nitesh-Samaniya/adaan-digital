const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected successfully.');
    } catch (error) {
        console.log('DB not connected.');
    }
}

module.exports = ConnectDB;