var mongoose = require('mongoose');

require('dotenv').config()
//Set up default mongoose connection
const mongoDdConnectionString = process.env.DB_CONNECTION_STRING


const DB_CONNECTION = () => {
    mongoose.connect(mongoDdConnectionString)
        .then(() => {
            console.log('Connected to MongoDB');
            // Your code here
        })
        .catch(error => {
            console.error('Error connecting to MongoDB:', error.message);
        });
}


module.exports = DB_CONNECTION


// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));