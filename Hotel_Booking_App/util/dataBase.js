const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const MONGO_URL = "mongodb+srv://chottu:chottu2004@airbnb.hpyrl.mongodb.net/?retryWrites=true&w=majority&appName=airbnb";
let _db;
const mongoConnect = (callback) => {

  MongoClient.connect(MONGO_URL)
    .then(client => {
      console.log("Connected to MongoDB");
      callback();
      _db=client.db("airbnb")
    })
    .catch(err => {
      console.log("Error occurred:", err);
    });
};
const getdb=()=>{
  if(!_db){
    throw new Error("Database is not connected")
  }
  else{
    return _db;
  }
}
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;
