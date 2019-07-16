'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, BIGINT } = Sequelize;
    await queryInterface.createTable('admin', {
      admin_id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      admin: STRING(50),
      admin_password: STRING(50),
      type: INTEGER,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('admin');
  },
};

