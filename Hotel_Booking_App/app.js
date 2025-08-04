const express =require('express');

const bodyParser=require('body-parser')

const path =require('path')                                                
const rootDir=require("./util/path")
                                                                                                                                          
const app=express();
app.set('view engine','ejs');
app.set('views','views');


const {hostRouter}=require('./routers/hostRouter');
const storeRouter=require('./routers/storeRouter');
const errorController=require('./controllers/errorController');
const {mongoConnect}= require('./util/dataBase');

app.use(express.static(path.join(rootDir,"public")))
app.use(bodyParser.urlencoded())



app.use(hostRouter);
app.use(storeRouter);


app.use((req,res,next)=>{
  console.log("This is my first middle ware :- ",req.url,req.method,req.body);
  next();
})

app.use(errorController.error404)


 const PORT =3001;
 mongoConnect(()=>{
  app.listen(PORT,()=>{
  console.log(`Server running at : http://localhost:${PORT}/`)
});
 })

