/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class WishlistService extends Service {
  /**
   *
   *根据用户id查询购物车
   * @return
   * @memberof AddressService
   */
  async showAll(id) {
    const results = await this.ctx.model.Shopcart.findAll({ where: { customer_id: id } });
    return results;
  }
  /**
   * 新建
   * @param {*} obj
   * @memberof AddressService
   */
  async newshopcart(obj) {
    const {
      cart_id,
      customer_id,
      goods_id,
      goods_name,
      nowPrice,
      goods_url,
      num,
    } = obj;
    const ctx = this.ctx;
    const result = await ctx.model.Shopcart.create({
      cart_id,
      customer_id,
      goods_id,
      goods_name,
      nowPrice,
      goods_url,
      num,
    });
    if (result) {
      return {
        code: 0,
        msg: '新增成功',
      };
    }
    return {
      code: 1,
      msg: '新增失败',
    };
  }
  async delete(id) {
    const wishlist = await this.ctx.model.Shopcart.findById(id);
    await wishlist.destroy();
    return {
      code: 0,
      msg: '取消成功',
    };
  }
}

module.exports = WishlistService;
