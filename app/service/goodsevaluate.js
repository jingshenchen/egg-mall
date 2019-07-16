/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class GoodsEvaluateService extends Service {
  /**
   *获取所有分类
   *
   * @param {*} obj
   * @returns
   * @memberof OrderService
   */
  async showAll(obj) {
    let { page, limit, goods_class_name } = obj;
    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;
    const Op = this.ctx.model.Op;
    const result = await this.ctx.model.Goodsclass.findAndCountAll({
      where: { goods_class_name: { [Op.like]: `%${goods_class_name}%` } }, offset, limit });
    result.page = Number(page);
    result.limit = limit;
    return { code: 20000, result };
  }
  async newEvaluate(objs) {
    console.log(objs);
    for (const obj in objs) {
      // const {
      //   goods_id,
      //   customer_id,
      //   name,
      //   imgUrl,
      //   mark,
      //   comment,
      // } = obj;
      console.log(obj);
      const ctx = this.ctx;
      await ctx.model.Goodsevaluate.create({
        goods_id: objs[obj].goods_id,
        customer_id: objs[obj].customer_id,
        name: objs[obj].name,
        imgUrl: objs[obj].imgUrl,
        mark: objs[obj].mark,
        comment: objs[obj].comment,
      });
      // if (result) {
      //   return { code: 20000, msg: '新增成功' };
      // }
      // return {
      //   code: 1,
      //   msg: '新增失败',
      // };
    }
  }
  async showOne(id) {
    const results = await this.ctx.model.Goodsevaluate.findAll({ where: { goods_id: id } });
    console.log(results);
    if (results.length > 0) {
      const user = await this.ctx.model.Customers.findOne({ where: { customer_id: results[0].customer_id } });
      for (const index of results) {
        index.name = user.name;
        index.imgUrl = user.photo;
      }
    }
    return {
      results,
      code: 20000,
    };
  }
  async updateGoodsClass(id, obj) {
    const {
      goods_class_name,
      goods_class_url,
    } = obj;
    const goodsclass = await this.ctx.model.Goodsclass.findById(id);
    // const ctx = this.ctx;
    if (goodsclass) {
      await this.ctx.model.Goodsclass.update({
        goods_class_name,
        goods_class_url,
      }, {
        where: { goods_class_id: id } });
    }
    return {
      code: 20000,
      message: '修改成功',
    };
  }
  async del(id) {
    const goodsclass = await this.ctx.model.Goodsclass.findById(id);
    if (!goodsclass) {
      return {
        code: 50000,
        message: '删除失败，不存在',
      };
    }
    goodsclass.destroy();
    return {
      code: 20000,
      message: '删除成功',
    };
  }
}

module.exports = GoodsEvaluateService;
