const express=require('express');
const authRouter=express.Router();
const authConroller=require('../controllers/authConroller')

authRouter.get("/login", authConroller.getLogin)
authRouter.post("/login", authConroller.postLogin)

exports.authRouter=authRouter;
