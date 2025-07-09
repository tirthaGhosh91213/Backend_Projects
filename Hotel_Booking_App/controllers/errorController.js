

exports.error404=(req,res,next)=>{
  res.statusCode=404;
  res.render('404',{pageTitle:'Page is not found'});
    res.end();

}