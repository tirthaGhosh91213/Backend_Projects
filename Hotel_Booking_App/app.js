const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); // ✅ to read cookies easily
const rootDir = require("./util/path");
const session =require('express-session')

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const { hostRouter } = require('./routers/hostRouter');
const storeRouter = require('./routers/storeRouter');
const { authRouter } = require('./routers/authRouter');
const errorController = require('./controllers/errorController');
const mongoose = require('mongoose');

// Middleware
app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:"Tirtha's Airbnb",
  resave:false,
  saveUninitialized:true
}))

// Debug: see cookies
app.use((req,res,next)=>{
  console.log("Here i print the cookie ",req.get('Cookie'))
  req.isLoggedIn=req.session.isLoggedIn;
  next()
})

// Public routes first
app.use(authRouter);

app.use((req, res, next) => {

  if (req.isLoggedIn) {
    return next();
  }

  return res.redirect('/login');
});

// Private routes
app.use(storeRouter);
app.use(hostRouter);

// Debug middleware
app.use((req, res, next) => {
  console.log("Request:", req.url, req.method, req.body);
  next();
});

// 404 handler
app.use(errorController.error404);

// Connect to MongoDB and start server
const PORT = 3001;
const path_url = "mongodb+srv://chottu:chottu2004@airbnb.hpyrl.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

mongoose.connect(path_url)
  .then(() => {
    console.log("mongoose is connected");
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}/`);
    });
  })
  .catch(error => {
    console.log(error);
  });
