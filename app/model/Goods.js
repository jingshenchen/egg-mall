'use strict';

module.exports = app => {
  const { STRING, INTEGER, FLOAT, DATE, TEXT } = app.Sequelize;
  const UUID = require('uuid');
  // 商品表model
  const Goods = app.model.define('goods', {
    goods_id: {
      type: UUID,
      primaryKey: true },
    goods_class_id: STRING(200),
    goods_name: STRING(50),
    goods_introduce: STRING(50),
    goods_brand: STRING(50),
    goods_weight: FLOAT,
    goods_url: STRING(50),
    marker_price: FLOAT,
    customer_price: FLOAT,
    is_refinement: INTEGER,
    is_discount: INTEGER,
    spec: TEXT,
    stock: INTEGER,
    num_view: INTEGER,
    num_comment: INTEGER,
    hasSpec: INTEGER,
    title: STRING(200),
    created_at: DATE,
    updated_at: DATE,
    new_date: DATE,
  });
  return Goods;
};
