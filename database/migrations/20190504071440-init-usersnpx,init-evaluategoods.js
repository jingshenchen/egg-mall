'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BIGINT } = Sequelize;
    await queryInterface.createTable('goodsevaluates', {
      id: { type: BIGINT, primaryKey: true, autoIncrement: true },
      goods_id: STRING(200),
      customer_id: STRING(200),
      name: STRING(200),
      imgUrl: STRING(255),
      mark: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('goodsevaluates');
  },
};

