'use strict';

module.exports = app => {
  const { STRING, DATE, FLOAT, INTEGER } = app.Sequelize;
  const UUID = require('uuid');
  // 订单表model
  const Order = app.model.define('shoporder', {
    order_id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v4() },
    customer_id: STRING(200),
    order_date: DATE,
    goods_id: STRING(200),
    total_price: FLOAT,
    ship_fee: FLOAT,
    pay_type: INTEGER,
    receive_name: STRING(200),
    receive_phone: STRING(200),
    receive_postcode: STRING(200),
    receive_address: STRING(200),
    order_status: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Order;
};
