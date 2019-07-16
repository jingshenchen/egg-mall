'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('customers', {
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
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('customers');
  },
};
