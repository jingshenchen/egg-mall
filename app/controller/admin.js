/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;


class AdminController extends Controller {
  /**
   * 用户登录
   */
  async login() {
    // const { ctx } = this;
    const ctx = this.ctx;
    const name = ctx.request.body.admin;
    const result = await ctx.service.admin.checkAccount(name);
    if (!result) {
      ctx.body = {
        msg: '登录失败',
        code: 1,
      };
      // ctx.helper.error(ctx, 1, '登录失败');
      return false;
    }
    ctx.body = result;
    // 首次登录不做验证
    if (!result.token) {
      // 校验Token合法性
      const isVerify = await ctx.helper.verifyToken(ctx, result.userId);
      console.log(isVerify);
      if (isVerify) {
        // ctx.body = {
        //   msg: '登录成功',
        //   code: 20000,
        //   token: result.token,
        //   admin_id: result.userId,
        // };
      } else {
        ctx.body = {
          msg: '登录失败',
          code: 1,
        };
      }
    } else {
      // ctx.body = {
      //   token: result.token,
      //   admin_id: result.userId,
      // };
    }
    // ctx.body = result;
  }
  /**
   * 查询所有用户
   */
  async index(ctx) {
    const result = await ctx.service.admin.showAll();
    ctx.body = result;
  }
  /**
   * 查询单个用户
   */
  // async show(ctx) {
  //   // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
  //   // console.log(isVerify);
  //   const result = await ctx.service.admin.showOne(ctx.params.id);
  //   // console.log(ctx);
  //   ctx.body = result;
  // }
  /**
   * 注册用户
   */
  async create() {
    const ctx = this.ctx;
    const result = await ctx.service.admin.newCustomers(ctx.request.body);
    ctx.body = result;
  }
  /**
   * 编辑用户
   */
  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.admin.updateCustomers(ctx.params.id, ctx.request.body);
    ctx.body = result;
  }
  async getAdmin() {
    const ctx = this.ctx;
    const result = await ctx.service.admin.getAdminInfo(ctx.params.token);
    ctx.body = result;
  }
}

module.exports = AdminController;
