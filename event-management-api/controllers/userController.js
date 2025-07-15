const userModel = require('../modules/userModel');

exports.createUser = async (req, res, next) => {
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};