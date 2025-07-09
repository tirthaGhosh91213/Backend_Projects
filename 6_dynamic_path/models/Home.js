
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
  static deleteById(homeID,callback){
    Home.fetchAll(homes=>{
      const newHome=homes.filter(home =>{
        if(home.ID !== homeID){
          return true;
        }
        else{
          return false;
        }
      })
      fs.writeFile(homeFilePath,JSON.stringify(newHome),error=>{
        if(error){
          callback(error);
          return;
        }
        Favourite.deleteById(homeID,callback);
      })
    })
  }
}

