const topicsRouter = require('express').Router();
const fetchAllTopics = require("../controllers/topicsControllers")
const { methodNotAllowed } = require('../errors');

topicsRouter
  .route('/')
  .get(fetchAllTopics)
  .all(methodNotAllowed);




module.exports = topicsRouter