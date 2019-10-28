const usersRouter = require('express').Router();
const getAuser = require("../controllers/userControllers")
const { methodNotAllowed } = require('../errors');

usersRouter
  .route('/:username')
  .get(getAuser)
  .all(methodNotAllowed);


module.exports = usersRouter