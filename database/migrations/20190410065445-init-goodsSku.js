'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID } = Sequelize;
    await queryInterface.createTable('goodsSkus', {
      sku_id: {
        type: UUID, primaryKey: true, defaultValue: UUID },
      goods_id: STRING(200),
      sku_name: STRING(200),
      num: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('goodsSku');
  },
};
