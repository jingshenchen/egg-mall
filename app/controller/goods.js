/* eslint-disable valid-jsdoc */
'use strict';
const Controller = require('egg').Controller;

class GoodsController extends Controller {
  /**
   * 查询所有商品
   *
   * @param {*} ctx
   * @memberof GoodsController
   */
  async index(ctx) {
    const result = await ctx.service.goods.showAll(ctx.query);
    ctx.body = result;
  }
  /**
   * 新建商品
   */
  async create(ctx) {
    const result = await ctx.service.goods.newGoods(ctx.request.body);
    ctx.body = result;
  }
  /**
   * 查询单个商品
   */
  async show(ctx) {
    const result = await ctx.service.goods.showOne(ctx.params.id);
    // console.log(result);
    ctx.body = result;
  }
  /**
   * 编辑商品
   */
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.goods.updateGoods(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
  async destroy(ctx) {
    const result = await ctx.service.goods.del(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  async exportGoods(ctx) {
    const result = await ctx.service.goods.newExcelGoods(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = GoodsController;
