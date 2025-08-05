const { getdb } = require("../util/dataBase");

module.exports= class Favourite{
   constructor(houseID){
    this.houseID=houseID;
  }
 
  save(){
    const db=getdb()
     return db.collection("favourites").findOne({houseID:this.houseID}).then(existingFav=>{
      if(!existingFav){
        return db.collection("favourites").insertOne(this)
      }else{
        return Promise.resolve();
      }
     })
    
   
  }
  static getFavourites(){
      const db=getdb();
      return db.collection("favourites").find().toArray()
  }

  static addToFavourite(homeID,callback){
    
  }
  

  static deleteById(removeHomeID){
    const db=getdb()
       return db.collection("favourites").deleteOne({houseID:removeHomeID})
  }
}

