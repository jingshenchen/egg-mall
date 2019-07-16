'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BIGINT, FLOAT, UUID } = app.Sequelize;

  const Users = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  // 用户表model
  const Customers = app.model.define('customers', {
    customer_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    password: STRING(50),
    sex: STRING(50),
    age: INTEGER,
    true_name: STRING(200),
    address: STRING(200),
    phone: STRING(200),
    postcode: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });
  // 管理员表model
  const Admin = app.model.define('admin', {
    admin_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
    admin: STRING(50),
    admin_password: STRING(50),
    type: INTEGER,
  });
  // 商品表model
  const Goods = app.model.define('goods', {
    goods_id: { type: UUID, primaryKey: true },
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
    created_at: DATE,
    updated_at: DATE,
  });
  // 商品类别表model
  const Goodsclass = app.model.define('goodsclass', {
    goods_class_id: { type: UUID, primaryKey: true },
    goods_class_name: STRING(200),
    goods_class_url: STRING(200),
    updated_at: DATE,
  });
  // 订单表model
  const Order = app.model.define('order', {
    order_id: { type: UUID, primaryKey: true },
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
  });
  return { Users, Customers, Admin, Goods, Goodsclass, Order };
};
