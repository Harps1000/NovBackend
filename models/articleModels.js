const connection = require("../db/connection");
const { checkAuser } = require("./userModels");
const { checkATopic } = require("./topicsModels");

exports.fetchArticleById = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", "=", article_id)
    .count({ comment_count: "articles.article_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

exports.checkArticleById = article_id  => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", "=", article_id)
    .then(data => {
      if (data.length === 0)
        return Promise.reject({ message: "Not Found", status: 404 });
      else return true;
    });
};

exports.patchArticleVotes = ({ article_id }, { inc_votes }) => {
  return connection("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", inc_votes || 0)
    .returning("*");
};

exports.getAllArticles = query => {
  let ordering = query.order || "desc";
  let sorting = query.sort_by || "created_at";

  return connection("articles")
    .select("articles.*")
    .modify(stat => {
      if (query.topic) stat.where("articles.topic", "=", query.topic);
    })
    .modify(stat => {
      if (query.author) stat.where("articles.author", "=", query.author);
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "articles.article_id" })
    .orderBy(sorting, ordering)
    .then(data => {
      if (data.length === 0) {
        let authorPromise = true;
        let topicPromise = true;
        if (query.author) {
          authorPromise =  checkAuser(query.author);
        }
        if (query.topic) {
          topicPromise = checkATopic(query.topic);
        }
        return Promise.all([data, authorPromise, topicPromise]);
      } else return data;
    });
};
