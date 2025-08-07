
const mongoose=require('mongoose');
const Favourite = require('./Favourite');
const homeSchema=mongoose.Schema({
  houseName:{
    type:String,
    require:true},
  price:{
    type:Number,
    require:true
  },
  rating:{
    type:String,
    require:true
  },
  location:{
    type:String,
    require:true
  },
  photoURL:String,
  description:String,

});

homeSchema.pre('findOneAndDelete', async function(next){
  const houseID=this.getQuery()._id;
  await Favourite.deleteMany({houseID:houseID});
  next()
})
module.exports=mongoose.model('Home',homeSchema)