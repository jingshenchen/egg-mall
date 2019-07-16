'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UUID = require('uuid');
  // 用户表model
  const Customers = app.model.define('customers', {
    customer_id: {
      type: UUID,
      primaryKey: true },
    name: STRING(50),
    password: STRING(50),
    photo: STRING(200),
    age: INTEGER,
    true_name: STRING(200),
    address: STRING(200),
    phone: STRING(200),
    postcode: STRING(200),
    token: STRING(200),
    created_at: DATE,
    updated_at: DATE,
  });
  return Customers;
};
