/* eslint-disable valid-jsdoc */
'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken

class LoginController extends Controller {
  async index() {
    const ctx = this.ctx;
    const name = ctx.query.name;
    const password = ctx.query.password;
    const result = await ctx.service.customers.checkAccount(name, password);
    ctx.body = result;
    const token = jwt.sign({
      user_id: 1, // user_id
      user_name: ctx.request.body.username, // user_name
    }, 'shenzhouhaotian', { // 秘钥
      expiresIn: '60s', // 过期时间
    });
    ctx.body = { // 返回给前端
      token,
    };
    ctx.status = 200; // 状态码 200
  }
}
module.exports = LoginController;
