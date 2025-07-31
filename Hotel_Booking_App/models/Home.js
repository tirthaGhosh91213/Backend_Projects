
const db=require("../util/dataBase");
// const Favourite = require('./Favourite');



module.exports= class Home{
  constructor(houseName,price,rating,location,photoURL,description,ID){
    this.houseName=houseName;
    this.price=price;
    this.rating=rating;
    this.location=location;
    this.photoURL=photoURL;
    this.description=description;
    this.ID=ID;
  }

  save(){ if(this.ID){
     return db.execute('UPDATE homes SET houseName=?,price=?,rating=?,location=?,photoURL=?,description=? WHERE id=?',[
    this.houseName,this.price,this.rating,this.location,this.photoURL,this.description,this.ID
    ])
  }else{
     return db.execute('INSERT INTO homes(houseName,price,rating,location,photoURL,description) VALUES(?,?,?,?,?,?)',[
    this.houseName,this.price,this.rating,this.location,this.photoURL,this.description
    ])
  }
   
    // this type for prevent sql injection
   
  }
  static fetchAll(){
   return db.execute('SELECT * FROM homes');
  }

  static findByID(homeID){
    return db.execute('SELECT * FROM homes WHERE id=?',[homeID])
    
  }
  static deleteById(homeID) {
    return db.execute('DELETE FROM homes WHERE id=?',[homeID])
 
    }

  }


