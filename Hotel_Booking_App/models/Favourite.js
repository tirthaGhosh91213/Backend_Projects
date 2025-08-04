const { getdb } = require("../util/dataBase");

module.exports= class Favourite{
   constructor(houseID){
    this.houseID=houseID;
  }
 
  save(){
    const db=getdb()
    return db.collection("favourites").insertOne(this)
   
  }
  static getFavourites(callback){
  
  }

  static addToFavourite(homeID,callback){
    
  }
  

  static deleteById(removeHomeID,callback){
   
  }
}

