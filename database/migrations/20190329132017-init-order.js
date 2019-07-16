'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, UUID, FLOAT } = Sequelize;
    await queryInterface.createTable('order', {
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
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('order');
  },
};
