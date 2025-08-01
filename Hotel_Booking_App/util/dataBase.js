const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const MONGO_URL = "mongodb+srv://chottu:chottu2004@airbnb.hpyrl.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then(client => {
      console.log("Connected to MongoDB");
      callback(client);
    })
    .catch(err => {
      console.log("Error occurred:", err);
    });
};

module.exports = mongoConnect;
