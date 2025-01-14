const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://prathameshmishra2020:%23dpmishra%3D1%2Bmongodb@cluster0.rfqwr.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
