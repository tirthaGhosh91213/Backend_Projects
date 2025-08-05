
const mongoose=require('mongoose')
const createSchema=mongoose.Schema({
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

})
module.exports=mongoose.model('Home',createSchema)