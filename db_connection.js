const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;

const dbHost = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADRESS}`

module.exports = mongoose.connect(dbHost, {
    useMongoClient: true,
});
