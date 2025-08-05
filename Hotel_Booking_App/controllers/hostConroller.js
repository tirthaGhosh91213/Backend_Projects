
const Home = require('./../models/Home');

exports.getAddhome=(req,res,next)=>{

  res.render('host/edit-home',{editing:false,pageTitle:' Add Home here'});

}
exports.getEditHome=(req,res,next)=>{
  const homeID=req.params.homeID;
  const editing =req.query.editing ==='true';
  if(!editing){
    console.log("Eaditing flag is not send properly ");
   return res.redirect("/Host-Homes");
  }
  Home.findById(homeID).then(home=>{
  
    if(!home){
      console.log("Home id is not found ");
      return res.redirect("/Host-Homes");
    }
    console.log(homeID,editing,home)
  res.render('host/edit-home',{ home:home , editing:editing , pageTitle:' Edit Home here'});
  })
}
exports.postDeleteHome=(req,res,next)=>{
  const homeID=req.params.homeID;
 Home.findByIdAndDelete(homeID).then(()=>{
  res.redirect("/Host-Homes")
 }).catch(error=>{
  console.log(error)
 })
 
}

exports.postEditHome=(req,res,next)=>{
  const {ID,houseName,price,rating,location,photoURL,description} =req.body;
  Home.findById(ID).then((home)=>{
    home.houseName=houseName,
    home.price=price,
    home.rating=rating,
    home.location=location,
    home.photoURL=photoURL,
    home.description=description
    home.save().then((result)=>{
      console.log(result)
    }).catch(error=>{
      console.log(error)
    })
    res.redirect("/Host-Homes")
    
  }).catch(error=>{
    console.log(error)
  });
}

exports.getHostHome=(req,res,next)=>{

   Home.find().then(registerHome=>{
    res.render('host/Host-Homes',{ homes : registerHome ,pageTitle:`Host Homes`});

});
}

exports.postAddHome=(req,res,next)=>{
  const {houseName,price,rating,location,photoURL,description} =req.body;
  const newHome=new Home({houseName,price,rating,location,photoURL,description});
  newHome.save().then(()=>{
    console.log("Home findd succesfully")
  })
  res.render('host/afterAddHome',{pageTitle:'home added successfully'});

}
