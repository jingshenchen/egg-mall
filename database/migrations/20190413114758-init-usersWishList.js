'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 testTable 表
  up: async (queryInterface, Sequelize) => {
    const { UUID, FLOAT, DATE, STRING } = Sequelize;
    await queryInterface.createTable('usersWishList', {
      id: { type: UUID, primaryKey: true, defaultValue: UUID },
      customer_id: STRING(200),
      goods_id: STRING(200),
      name: STRING(200),
      price: FLOAT,
      imgUrl: STRING(200),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 testTable 表
  down: async queryInterface => {
    await queryInterface.dropTable('usersWishList');
  },
};
