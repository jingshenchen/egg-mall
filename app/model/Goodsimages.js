'use strict';

module.exports = app => {
  const { STRING, BIGINT, DATE } = app.Sequelize;

  const Goodsimages = app.model.define('goodsimages', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    goods_id: STRING(200),
    name: STRING(45),
    imgurl: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });
  return Goodsimages;
};
