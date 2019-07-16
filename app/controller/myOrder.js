/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class MyOrderController extends Controller {
  async showMyOrder(ctx) {
    const result = await ctx.service.order.showMyAllOrder(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = MyOrderController;
