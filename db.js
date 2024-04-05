const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://10.12.15.70:27017/bitter';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB-tilkoblingsfeil:'));
db.once('open', () => {
    console.log('Tilkoblet til MongoDB-databasen');
});

module.exports = db;
