const { check, validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render('auth/login', { pageTitle: 'Login page', isLoggedIn: false });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', { 
    pageTitle: 'Signup page', 
    isLoggedIn: false,
    errors: [],
    oldInput: { userName: "", email: "", password: "", ConfirmPassword: "", userRole: "" }
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect('/');
};

exports.postSignup = [

  check('userName')
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name should contain at least 2 characters.")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("The name should only contain alphabets."),

  check('email')
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),

  check('password')
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    // .matches(/a-z/) 
    //  .withMessage("Enter a small charator ")
    //  .matches(/A-Z/) 
    // .withMessage("Enter a captial cartor ") 
    // .matches(/@!#$%^&*/) 
    // .withMessage("Enter a spaial charactor ")
    ,

  check('ConfirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),

  check('userRole')
    .notEmpty()
    .withMessage("Please select a role.")
    .isIn(['guest', 'host'])
    .withMessage("Invalid role selected."),

  check('terms')
    .equals("Confirm the checkbox")
    .withMessage("Please accept the terms and conditions."),

  (req, res, next) => {
    const { userName, email, password, ConfirmPassword, userRole } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/signup', {
        pageTitle: 'Signup page',
        isLoggedIn: false,
        errors: errors.array().map(error => error.msg),
        oldInput: { userName, email, password, ConfirmPassword, userRole }
      });
    }

    console.log("✅ Signup successful:", req.body);
    res.redirect("/login");
  }
];

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login');
  });
};
