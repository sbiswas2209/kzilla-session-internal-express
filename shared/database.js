const { MongoClient } = require("mongodb");
const config = require("./config");

let db;
const initializeDbClient = async() => {
    const client = await MongoClient.connect(config.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
    });
    console.log("Connection to DB successful!");
    return client.db('session');
};

module.exports = async() => {
    if (!db) {
        db = await initializeDbClient();
    }
    return db;
};