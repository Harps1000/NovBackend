const articlesRouter = require('express').Router();
const {getArticlesById, updateArticleVotes, getArticles} = require("../controllers/articlesControllers");
const {postComments, getCommentsByArticleID} = require("../controllers/commentsControllers");
const { methodNotAllowed } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(updateArticleVotes)
  .all(methodNotAllowed);

articlesRouter
  .route('/')
  .get(getArticles)
  .all(methodNotAllowed);

  articlesRouter
  .route("/:article_id/comments")
  .post(postComments)
  .get(getCommentsByArticleID)
  .all(methodNotAllowed);


module.exports = articlesRouter;