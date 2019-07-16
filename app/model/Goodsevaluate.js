'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE, INTEGER } = app.Sequelize;

  const Goodsimages = app.model.define('goodsevaluates', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    goods_id: STRING(200),
    customer_id: STRING(200),
    name: STRING(200),
    imgUrl: STRING(255),
    mark: INTEGER,
    comment: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });
  return Goodsimages;
};
