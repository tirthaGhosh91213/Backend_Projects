
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
  Home.findByID(homeID,home=>{
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
 Home.deleteById(homeID,error=>{
  if(error){
    console.log("Home is not found ",error)
  }
  res.redirect("/Host-Homes")
 })
 
}

exports.postEditHome=(req,res,next)=>{
  const {ID,houseName,price,rating,location,photoURL} =req.body;
  const newHome=new Home(houseName,price,rating,location,photoURL);
  newHome.ID=ID;
  newHome.save(error=>{
    if(error){
      console.log("Error is create in the code ",error)
    }
    else{
      res.redirect("/Host-Homes")
    }
  });
}

exports.getHostHome=(req,res,next)=>{

  Home.fetchAll(registerHome=>{
    res.render('host/Host-Homes',{ homes : registerHome ,pageTitle:`Host Homes`});

});
}

exports.postAddHome=(req,res,next)=>{
  const {houseName,price,rating,location,photoURL} =req.body;
  const newHome=new Home(houseName,price,rating,location,photoURL);
  newHome.save(error=>{
    if(error){
      res.redirect('/')
    }
    else{
      res.render("host/home-added",{pageTitle:'Home Hosted'})
    }
  });
  console.log(req.body)
  
  
  res.render('host/afterAddHome',{pageTitle:'home added successfully'});

}
