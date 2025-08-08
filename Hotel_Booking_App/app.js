const express =require('express');
const bodyParser=require('body-parser')
const path =require('path')                                                
const rootDir=require("./util/path")
                                                                                                                                          
const app=express();
app.set('view engine','ejs');
app.set('views','views');


const {hostRouter}=require('./routers/hostRouter');
const storeRouter=require('./routers/storeRouter');
const {authRouter}=require('./routers/authRouter')
const errorController=require('./controllers/errorController');
const { default: mongoose } = require('mongoose');


app.use(express.static(path.join(rootDir,"public")))
app.use(bodyParser.urlencoded())

app.use(hostRouter);
app.use(storeRouter);
app.use(authRouter);

app.use((req,res,next)=>{
  console.log("This is my first middle ware :- ",req.url,req.method,req.body);
  next();
})

app.use(errorController.error404)


 const PORT =3001;
 const path_url="mongodb+srv://chottu:chottu2004@airbnb.hpyrl.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb"
 mongoose.connect(path_url).then(()=>{
  console.log("mongoose is connected ")
  app.listen(PORT,()=>{
  console.log(`Server running at : http://localhost:${PORT}/`)
});
 }).catch(error=>{
  console.log(error)
 })

