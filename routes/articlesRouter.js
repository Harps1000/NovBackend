const articlesRouter = require('express').Router();
const {getArticlesById, updateArticleVotes, getArticles} = require("../controllers/articlesControllers")
const { methodNotAllowed } = require('../errors');
const {
  postComments,
  getCommentsByArticleID
} = require("../controllers/commentsControllers");

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