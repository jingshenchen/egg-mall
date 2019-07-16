'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, BIGINT, FLOAT, STRING } = Sequelize;
    await queryInterface.createTable('orderGoods', {
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
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('orderGoods');
  },
};
