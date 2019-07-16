/* eslint-disable valid-jsdoc */
'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
  /**
   * 查询所有文章
   */
  async index(ctx) {
    // const isVerify = await ctx.helper.verifyToken(ctx, ctx.params.id);
    // console.log(isVerify);
    const result = await ctx.service.articles.showAll(ctx.query);
    // console.log(ctx);
    ctx.body = result;
  }
  /**
   * 新增文章
   *
   * @param {*} ctx
   */
  async create(ctx) {
    const result = await ctx.service.articles.newArticle(ctx.request.body);
    ctx.body = result;
  }
  async destroy(ctx) {
    const result = await ctx.service.articles.delete(ctx.params.id);
    ctx.body = result;
  }
  /**
   * 查询文章详情
   */
  async show(ctx) {
    const result = await ctx.service.articles.showOne(ctx.params.id);
    // console.log(result);
    ctx.body = result;
  }
}

module.exports = ArticlesController;
