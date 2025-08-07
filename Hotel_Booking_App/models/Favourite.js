const mongoose=require('mongoose');
const favouriteSchema=mongoose.Schema({
  houseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Home",
    require:true,
    unique:true,
  }
})
module.exports=mongoose.model('Favourite',favouriteSchema)

