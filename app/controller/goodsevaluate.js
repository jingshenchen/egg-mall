/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class GoodsEvaluateController extends Controller {
  /**
   * 查询所有分类
   *
   * @param {*} ctx
   */
  async index(ctx) {
    const result = await ctx.service.goodsclass.showAll(ctx.query);
    ctx.body = result;
  }
  /**
   * 新建分类
   *
   * @param {*} ctx
   */
  async create(ctx) {
    const result = await ctx.service.goodsevaluate.newEvaluate(ctx.request.body);
    ctx.body = result;
  }
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.goodsevaluate.showOne(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.goodsclass.updateGoodsClass(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
  async destroy(ctx) {
    const result = await ctx.service.goodsclass.del(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
}

module.exports = GoodsEvaluateController;
