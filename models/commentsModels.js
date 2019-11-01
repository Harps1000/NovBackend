const connection = require("../db/connection");
const {checkArticleById} = require("./articleModels")


exports.getingCommentsByArticleID = (query, { article_id }) => {
  let sorting = query.sort_by || "created_at";
  let ordering = query.order || "desc";
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", "=", article_id)
    .orderBy(sorting, ordering)
    .then(data => {
      if (data.length === 0) {
        let artPromise = true;
            artPromise = checkArticleById(article_id)
        return Promise.all([data, artPromise]);
      } else return data;
    });
};

exports.postingComment = ( body , { article_id }) => {
  let comm = { ...body };
  let comment = {}
  
  comment.author = comm.username;
  comment.body = comm.body;
  
  comment.article_id = article_id;
  comment.created_at = new Date(Date.now());
  
  return connection("comments")
    .insert(comment)
    .returning("*");
};

exports.deleteComment = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .returning("*");
};

exports.updateCommentVote = ({ inc_votes }, { comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", inc_votes || 0)
    .returning("*");
};


