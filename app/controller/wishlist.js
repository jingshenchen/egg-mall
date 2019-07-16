/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class WishlistController extends Controller {
  /**
   * 查询某个用户的收藏夹
   */
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.wishlist.showAll(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 加入收藏夹
   *
   * @param {*} ctx
   * @memberof AddressController
   */
  async create(ctx) {
    const result = await ctx.service.wishlist.newWishlist(ctx.request.body);
    ctx.body = result;
  }
  async destroy(ctx) {
    const result = await ctx.service.wishlist.delete(ctx.params.id);
    ctx.body = result;
  }
}

module.exports = WishlistController;
