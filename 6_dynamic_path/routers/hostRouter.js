const express=require('express');
const hostRouter=express.Router();
const hostConroller=require('./../controllers/hostConroller')

hostRouter.get("/add-home", hostConroller.getAddhome)
hostRouter.post("/add-home",hostConroller.postAddHome)
hostRouter.get("/Host-homes",hostConroller.getHostHome)
hostRouter.get("/edit-home/:homeID",hostConroller.getEditHome)
hostRouter.post("/edit-home",hostConroller.postEditHome)
hostRouter.post("/delete-home/:homeID",hostConroller.postDeleteHome)

exports.hostRouter=hostRouter;
