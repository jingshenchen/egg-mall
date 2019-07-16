'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UUID = require('uuid');
  // 地址表model
  const Address = app.model.define('addresses', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v4() },
    customer_id: STRING(200),
    name: STRING(200),
    address: STRING(200),
    tel: STRING(200),
    postcode: STRING(200),
    type: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  return Address;
};
