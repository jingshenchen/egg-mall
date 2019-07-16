'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, UUID } = Sequelize;
    await queryInterface.createTable('articles', {
      article_id: { type: UUID, primaryKey: true, defaultValue: UUID },
      admin_id: STRING(200),
      imgUrl: STRING(255),
      title: STRING(200),
      content: STRING(255),
      view: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('articles');
  },
};

