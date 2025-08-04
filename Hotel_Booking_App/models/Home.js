
const { ObjectId } = require("mongodb");
const {getdb}=require("../util/dataBase");
// const Favourite = require('./Favourite');



module.exports= class Home{
  constructor(houseName,price,rating,location,photoURL,description,_id){
    this.houseName=houseName;
    this.price=price;
    this.rating=rating;
    this.location=location;
    this.photoURL=photoURL;
    this.description=description;
    if(_id){
       this._id=_id;
    }
   
  }

  save(){ 
    const db=getdb();
    if(this._id){
      return db.collection("homes").updateOne({_id:new ObjectId(String(homeID))},{$set:this})
    }else{
      return db.collection("homes").insertOne(this)
    }
  
  
}
  static fetchAll(){
   const db=getdb();
   return db.collection("homes").find().toArray()
  }

  static findByID(homeID){
    console.log(homeID)
   const db=getdb()
  return db.collection("homes").find({_id:new ObjectId(String(homeID))}).next()
    
  }
  static deleteById(homeID) {
   
     const db=getdb()
    return db.collection("homes").deleteOne({_id:new ObjectId(String(homeID))})
    }

  }


