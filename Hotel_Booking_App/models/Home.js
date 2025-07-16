
const fs =require('fs');
const path=require('path')
const rootDir=require('./../util/path');
const { error } = require('console');
const Favourite = require('./Favourite');
const homeFilePath=path.join(rootDir,'data','homes.json');


module.exports= class Home{
  constructor(houseName,price,rating,location,photoURL){
    this.houseName=houseName;
    this.price=price;
    this.rating=rating;
    this.location=location;
    this.photoURL=photoURL;
  }

  save(callback){
    Home.fetchAll(registerHome=>{
      if(this.ID){
          registerHome=registerHome.map(home=>home.ID !== this.ID ? home : this)
      }
      else{
        this.ID=Math.random().toString();
        registerHome.push(this);
      }
      fs.writeFile(homeFilePath,JSON.stringify(registerHome),callback)
    })
   
  }
  static fetchAll(callback){
    fs.readFile(homeFilePath,(err,data)=>{
      if(err){
        callback([]);

      }
      else{
        callback(JSON.parse(data));
      }
    })
  }

  static findByID(homeID,callback){
    Home.fetchAll(homes=>{
      const home =homes.find(home=>home.ID===homeID);
      callback(home);
    })
  }
  static deleteById(homeID, callback) {
  Home.fetchAll(homes => {
    const newHome = [];

    // Manually copy all homes except the one with matching ID
    for (let i = 0; i < homes.length; i++) {
      if (homes[i].ID !== homeID) {
        newHome.push(homes[i]);
      }
    }

    // Write updated home list to file
    fs.writeFile(homeFilePath, JSON.stringify(newHome), error => {
      if (error) {
        return callback(error); // Return error if write fails
      }

      // Also delete from Favourite list
      Favourite.deleteById(homeID, callback);
    });
  });
}

}

