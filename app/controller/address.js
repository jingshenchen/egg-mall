/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class AddressController extends Controller {
  /**
   * 查询所有地址
   */
  async index(ctx) {
    const result = await ctx.service.address.showAll();
    ctx.body = result;
  }
  /**
   * 查询某个用户的所有地址
   */
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.address.showAll(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 新建用户的地址
   *
   * @param {*} ctx
   * @memberof AddressController
   */
  async create(ctx) {
    const result = await ctx.service.address.newAddress(ctx.request.body);
    ctx.body = result;
  }
  /**
   * 编辑用户地址
   */
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.address.updateAddress(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
}

module.exports = AddressController;
