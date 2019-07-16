'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID } = Sequelize;
    await queryInterface.createTable('usersAddress', {
      address_id: {
        type: UUID, primaryKey: true, defaultValue: UUID },
      customer_id: STRING(200),
      name: STRING(200),
      address_details: STRING(200),
      phone: STRING(200),
      postcode: STRING(200),
      type: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('usersAddress');
  },
};
