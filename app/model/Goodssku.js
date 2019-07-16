'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT, BIGINT } = app.Sequelize;
  // const UUID = require('uuid');
  const Goodssku = app.model.define('goodsskus', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    goods_id: STRING(200),
    sku_type_name: STRING(200),
    name: STRING(200),
    num: INTEGER,
    price: FLOAT,
    imgUrl: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });
  return Goodssku;
};
