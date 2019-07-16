/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class ArticlesService extends Service {
  /**
   *
   *根据用户id查询购物车
   * @return
   * @memberof AddressService
   */
  async showAll(obj) {
    let { page, limit, title } = obj;
    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;
    const Op = this.ctx.model.Op;
    const result = await this.ctx.model.Articles.findAndCountAll({
      where: { title: { [Op.like]: `%${title}%` } }, offset, limit });
    result.page = Number(page);
    result.limit = limit;
    return { code: 20000, result };
  }
  /**
   * 新建
   * @param {*} obj
   * @memberof AddressService
   */
  async newArticle(obj) {
    const UUID = require('uuid');
    const {
      admin_id,
      title,
      content,
      imgUrl,
      view,
    } = obj;
    const ctx = this.ctx;
    const result = await ctx.model.Articles.create({
      article_id: UUID.v4(),
      admin_id,
      title,
      content,
      imgUrl,
      view,
    });
    if (result) {
      return {
        code: 20000,
        msg: '新增成功',
      };
    }
    return {
      code: 1,
      msg: '新增失败',
    };
  }
  async delete(id) {
    const wishlist = await this.ctx.model.Articles.findById(id);
    await wishlist.destroy();
    return {
      code: 20000,
      msg: '删除成功',
    };
  }
  async showOne(id) {
    const result = await this.ctx.model.Articles.findOne({ where: { article_id: id } });
    return {
      code: 20000,
      result,
    };
  }
}

module.exports = ArticlesService;
