/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;


class CustomersController extends Controller {
  /**
   * 用户登录
   */
  async login() {
    // const { ctx } = this;
    const ctx = this.ctx;
    const name = ctx.request.body.name;
    const result = await ctx.service.customers.checkAccount(name);
    if (!result) {
      ctx.body = {
        msg: '登录失败',
        code: 1,
      };
      // ctx.helper.error(ctx, 1, '登录失败');
      return false;
    }
    // 首次登录不做验证
    if (!result.token) {
      // 校验Token合法性
      const isVerify = await ctx.helper.verifyToken(ctx, result.userId);
      console.log(isVerify);
      if (isVerify) {
        ctx.body = {
          msg: '登录成功',
          code: 0,
          user_id: result.userId,
        };
      } else {
        ctx.body = {
          msg: '登录失败',
          code: 1,
        };
      }
    } else {
      ctx.body = {
        customers_key: result.token,
        user_id: result.userId,
      };
    }
    // ctx.body = result;
  }
  /**
   * 查询所有用户
   */
  async index(ctx) {
    const result = await ctx.service.customers.showAll();
    ctx.body = result;
  }
  /**
   * 查询单个用户
   */
  async show(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.customers.showOne(ctx.params.id);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 注册用户
   */
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.customers.newCustomers(ctx.request.body);
    ctx.body = result;
  }
  /**
   * 编辑用户
   */
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.customers.updateCustomers(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
}

module.exports = CustomersController;
