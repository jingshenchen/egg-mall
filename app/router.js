'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.get('/users', controller.users.index);
  // router.resources('topics', '/api/v2/topics', controller.topics);
  router.resources('users', '/users', controller.users);
  // 用户
  router.resources('customers', '/customers', controller.customers);
  router.post('/login', controller.customers.login);
  // 商品
  router.resources('goods', '/goods', controller.goods);
  // 地址
  router.resources('address', '/address', controller.address);
  // 收藏夹
  router.resources('wishlist', '/wishlist', controller.wishlist);
  // 订单
  router.resources('order', '/order', controller.order);
  // 我的订单
  router.post('/myOrder', controller.order.showMyOrder);
  router.get('/myOrder/:id', controller.order.showOrderNum);
  // 购物车
  router.resources('shopcart', '/shopcart', controller.shopcart);
  // 分类
  router.resources('goodsclass', '/goodsclass', controller.goodsclass);
  // 管理员
  router.resources('admin', '/admin', controller.admin);
  // 商品评价
  router.resources('goodsevaluate', '/goodsevaluate', controller.goodsevaluate);
  // 管理员登录
  router.post('/adminlogin', controller.admin.login);
  // 获取管理员信息
  router.get('/admin/:token', controller.admin.getAdmin);
  // 文章
  router.resources('articles', '/articles', controller.articles);
    // 批量导入
    router.post('excelGoods', '/excelgoods', controller.goods.exportGoods);
};

