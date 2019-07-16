'use strict';

module.exports = app => {
  const { STRING, DATE, FLOAT, INTEGER } = app.Sequelize;
  const UUID = require('uuid');
  // 购物车表model
  const Shopcart = app.model.define('shopcart', {
    cart_id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v4() },
    goods_id: STRING(200),
    nowPrice: FLOAT,
    goods_name: STRING(200),
    goods_url: STRING(200),
    num: INTEGER,
    customer_id: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });
  return Shopcart;
};
