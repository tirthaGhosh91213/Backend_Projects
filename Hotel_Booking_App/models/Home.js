
const db=require("../util/dataBase");
// const Favourite = require('./Favourite');



module.exports= class Home{
  constructor(houseName,price,rating,location,photoURL){
    this.houseName=houseName;
    this.price=price;
    this.rating=rating;
    this.location=location;
    this.photoURL=photoURL;
  }

  save(){
    
   
  }
  static fetchAll(){
   return db.execute('SELECT * FROM homes');
  }

  static findByID(homeID,callback){
    
  }
  static deleteById(homeID, callback) {
 
    }

  }


