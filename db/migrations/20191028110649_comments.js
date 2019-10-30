
exports.up = function(knex) {
    return knex.schema.createTable("comments", com => {
        com.increments("comment_id").primary();
        com.string("author").references("users.username").notNullable();
        com.integer("article_id").references("articles.article_id").notNullable();
        com.integer("votes").defaultTo(0);
        com.timestamp("created_at").defaultTo(knex.fn.now());
        com.text("body");
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
