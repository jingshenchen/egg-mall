'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;
  const UUID = require('uuid');
  // 商品类别表model
  const Goodsclass = app.model.define('goodsclass', {
    goods_class_id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUID.v4() },
    goods_class_name: STRING(200),
    goods_class_url: STRING(200),
    updated_at: DATE,
    created_at: DATE,
  });
  return Goodsclass;
};
