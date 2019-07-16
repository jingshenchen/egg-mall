'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, UUID } = Sequelize;
    await queryInterface.createTable('goodsclass', {
      goods_class_id: { type: UUID, primaryKey: true },
      goods_class_name: STRING(200),
      goods_class_url: STRING(200),
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('goodsclass');
  },
};
