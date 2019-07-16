'use strict';

module.exports = app => {
  const { STRING, DATE, FLOAT, INTEGER, BIGINT } = app.Sequelize;

  // 订单表model
  const Ordergoods = app.model.define('ordergoods', {
    id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    order_id: STRING(200),
    goods_id: STRING(200),
    goods_name: STRING(50),
    customer_price: FLOAT,
    goods_url: STRING(255),
    num: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Ordergoods;
};
