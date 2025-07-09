const express=require('express');

const storeControler =require('../controllers/storeControler')


const storeRouter=express.Router();


storeRouter.get("/",storeControler.getIndex)
storeRouter.get("/homes",storeControler.getHomes)
storeRouter.get("/homes/:homeID",storeControler.getHomeDetailes)
storeRouter.get("/favourite",storeControler.getFavourite)
storeRouter.post("/favourite",storeControler.postFavourite);
storeRouter.post("/favourite/remove/:homeID",storeControler.postRemoveFav)


module.exports=storeRouter;