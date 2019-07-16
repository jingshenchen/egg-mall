'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UUID = require('uuid');
  // 管理员表model
  const Articles = app.model.define('articles', {
    article_id: { type: UUID, primaryKey: true },
    admin_id: STRING(200),
    imgUrl: STRING(255),
    title: STRING(200),
    content: STRING(255),
    view: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Articles;
};
