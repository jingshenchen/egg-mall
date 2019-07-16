/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class WishlistService extends Service {
  /**
   *
   *根据用户id查询收藏夹
   * @return
   * @memberof AddressService
   */
  async showAll(id) {
    const results = await this.ctx.model.UsersWishList.findAll({ where: { customer_id: id } });
    return results;
  }
  /**
   * 新建
   * @param {*} obj
   * @memberof AddressService
   */
  async newWishlist(obj) {
    const {
      customer_id,
      goods_id,
      name,
      price,
      imgUrl,
    } = obj;
    const ctx = this.ctx;
    const result = await ctx.model.UsersWishList.create({
      customer_id,
      goods_id,
      name,
      price,
      imgUrl,
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
    const wishlist = await this.ctx.model.UsersWishList.findById(id);
    await wishlist.destroy();
    return {
      code: 0,
      msg: '取消成功',
    };
  }
}

module.exports = WishlistService;
