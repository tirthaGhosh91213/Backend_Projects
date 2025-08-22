exports.getLogin = (req, res, next) => {
  res.render('auth/login', { pageTitle: 'Login page', isLoggedIn: false });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
};
