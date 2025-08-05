
const Favourite = require("../models/Favourite");
const Home=require("./../models/Home");

exports.getIndex=(req,res,next)=>{
   Home.fetchAll().then(registerHome=>{
    res.render('store/home-page',{ homes : registerHome ,pageTitle:`Tirtha's airbnb`});
  });
  
}
exports.getHomes=(req,res,next)=>{
   Home.fetchAll().then(registerHome=>{
    res.render('store/homes',{ homes : registerHome ,pageTitle:`Here all Homes`});
  });
  
}
exports.postFavourite=(req,res,next)=>{
  
const homeID=req.body.ID;
const fav=new Favourite(homeID)
fav.save().then(result=>{
  console.log("Favourite added",result)
}).catch(err=>{
  console.log("Error is occures",err)
}).finally(()=>{
   res.redirect("/favourite");
})
  
}

exports.postRemoveFav=(req,res,next)=>{
  const homeID= req.params.homeID;
  Favourite.deleteById(homeID).then(result=>{
  console.log("Favourite removed ",result)
}).catch(err=>{
  console.log("Error is occures",err)
}).finally(()=>{
   res.redirect("/favourite");
})
  
}

exports.getFavourite=(req,res,next)=>{
  Favourite.getFavourites().then(favouriteIDs=>{
    favouriteIDs=favouriteIDs.map(fav=>fav.houseID)

  Home.fetchAll().then(registerHome=>{
    const favouriteHome = registerHome.filter(home=>favouriteIDs.includes(home._id.toString()))
    res.render('store/favourite',
      { homes : favouriteHome ,
      pageTitle:`Here all favourite Homes`});
  });
})
  
}

exports.getHomeDetailes=(req,res,next)=>{
  const homeID=req.params.homeID;
  Home.findByID(homeID).then(home=>{
    
    if(!home){
      console.log("Home not found ")
      return res.redirect("/homes");
    }
    else{
           console.log("Here is your Home ID ",homeID,home);
  res.render('store/homeDetails',{home:home,pageTitle:` Home Details `});
    }
  })
}