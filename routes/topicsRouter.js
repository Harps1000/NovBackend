const topicsRouter = require('express').Router();
const getAllTopics = require("../controllers/topicsControllers")
const { methodNotAllowed } = require('../errors');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all(methodNotAllowed);




module.exports = topicsRouter