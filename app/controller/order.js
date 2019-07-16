/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  async showMyOrder(ctx) {
    const result = await ctx.service.order.showMyAllOrder(ctx.request.body);
    ctx.body = result;
  }
  /**
   * 查询某个订单
   */
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.order.showOne(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 新建订单
   *
   * @param {*} ctx
   * @memberof AddressController
   */
  async create(ctx) {
    const result = await ctx.service.order.newOrder(ctx.request.body);
    ctx.body = result;
  }
  async showOrderNum(ctx) {
    const result = await ctx.service.order.showMyOrderNum(ctx.params.id);
    ctx.body = result;
  }
  /**
   * 查询所有商品
   *
   * @param {*} ctx
   * @memberof GoodsController
   */
  async index(ctx) {
    const result = await ctx.service.order.showAll(ctx.query);
    ctx.body = result;
  }
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.order.updateStatus(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
}

module.exports = OrderController;
