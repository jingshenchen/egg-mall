'use strict';

module.exports = app => {
  const { STRING, DATE, FLOAT } = app.Sequelize;
  const UUID = require('uuid');
  // 购物车表model
  const Userswishlist = app.model.define('userswishlist', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v1() },
    customer_id: STRING(200),
    goods_id: STRING(200),
    name: STRING(200),
    price: FLOAT,
    imgUrl: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });
  return Userswishlist;
};
