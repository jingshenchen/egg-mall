'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, DATE, UUID, FLOAT } = Sequelize;
    await queryInterface.createTable('goods', {
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
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('goods');
  },
};
