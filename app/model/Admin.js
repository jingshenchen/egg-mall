'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UUID = require('uuid');
  // 管理员表model
  const Admin = app.model.define('admin', {
    admin_id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v4() },
    admin: STRING(50),
    admin_password: STRING(50),
    type: INTEGER,
    token: STRING(200),
    avatar: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });
  return Admin;
};
