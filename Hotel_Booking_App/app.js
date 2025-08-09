const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const rootDir = require("./util/path");
const mongoose = require('mongoose');

const path_url = "mongodb+srv://chottu:chottu2004@airbnb.hpyrl.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airbnb";

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session store
const store = new mongoDBStore({
  uri: path_url,
  collection: 'sessions'
});

// Routers
const { hostRouter } = require('./routers/hostRouter');
const storeRouter = require('./routers/storeRouter');
const { authRouter } = require('./routers/authRouter');
const errorController = require('./controllers/errorController');

// Middleware
app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "Tirtha's Airbnb",
  resave: false,
  saveUninitialized: false,
  store: store
}));

// Debug middleware
app.use((req, res, next) => {
  console.log("Session:", req.session);
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Public routes first (login, signup, etc.)
app.use(authRouter);

// Auth guard for private routes
app.use((req, res, next) => {
  const publicPaths = ['/login', '/signup']; // Add more if needed
  if (publicPaths.includes(req.path)) {
    return next();
  }

  if (req.isLoggedIn) {
    return next();
  }

  return res.redirect('/login');
});

// Private routes
app.use(storeRouter);
app.use(hostRouter);

// Debug requests
app.use((req, res, next) => {
  console.log("Request:", req.url, req.method, req.body);
  next();
});

// 404 handler
app.use(errorController.error404);

// Connect to MongoDB & start server
const PORT = 3001;

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
