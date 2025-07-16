
const fs =require('fs');
const path=require('path')
const rootDir=require('../util/path');
const favouriteFilePath=path.join(rootDir,'data','favourite.json');


module.exports= class Favourite{
 
  save(callback){
    this.ID=Math.random().toString();
    Home.fetchAll(registerHome=>{
      registerHome.push(this);
      fs.writeFile(homeFilePath,JSON.stringify(registerHome),callback)
    })
   
  }
  static fetchAll(callback){
    fs.readFile(favouriteFilePath,(err,data)=>{
      if(err){
        callback([]);

      }
      else{
        callback(JSON.parse(data));
      }
    })
  }

  static addToFavourite(homeID,callback){
    Favourite.fetchAll(favouriteIDs=>{
      if(favouriteIDs.includes(homeID)){
        return callback('Already added to favourites');
      }
      else{
          favouriteIDs.push(homeID);
      fs.writeFile(favouriteFilePath,JSON.stringify(favouriteIDs),callback)
      }
      
    })
  }
  

  static deleteById(removeHomeID,callback){
    Favourite.fetchAll(homeIDs=>{
      const removeFavouriteID =homeIDs.filter(homeID =>removeHomeID !==homeID)
      fs.writeFile(favouriteFilePath,JSON.stringify(removeFavouriteID),callback)
    })
      
  
  }
}

