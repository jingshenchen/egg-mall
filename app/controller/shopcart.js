/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class ShopcartController extends Controller {
  /**
   * 查询某个用户的购物车
   */
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.shopcart.showAll(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 加入购物车
   *
   * @param {*} ctx
   */
  async create(ctx) {
    const result = await ctx.service.shopcart.newshopcart(ctx.request.body);
    ctx.body = result;
  }
  async destroy(ctx) {
    const result = await ctx.service.shopcart.delete(ctx.params.id);
    ctx.body = result;
  }
}

module.exports = ShopcartController;
