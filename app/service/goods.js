/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;
const moment = require('moment');

class GoodsService extends Service {
  async newExcelGoods(array) {
    console.log(array);
    const UUID = require('uuid');
    const nowDate = moment();
    for (const index of array) {
      const ctx = this.ctx;
      await ctx.model.Goods.create({
        goods_id: UUID.v4(),
        goods_name: index.goods_name,
        goods_brand: index.goods_brand,
        goods_url: index.goods_url,
        marker_price: index.marker_price,
        customer_price: index.customer_price,
        stock: index.customer_price,
        title: index.title,
        goods_class_id: index.goods_class_id,
        new_date: nowDate,
      });
    }
    return {
      code: 20000,
    };
  }
  /**
   *  新建商品
   */
  async newGoods(obj) {
    const UUID = require('uuid');
    const {
      goods_class_id,
      goods_name,
      goods_introduce,
      goods_brand,
      goods_weight,
      goods_url,
      marker_price,
      customer_price,
      is_refinement,
      is_discount,
      stock,
      num_view,
      num_comment,
      hasSpec,
      goodsImages,
      goodsSku,
      title,
    } = obj;
    const nowDate = moment();
    const ctx = this.ctx;
    const result = await ctx.model.Goods.create({
      goods_id: UUID.v4(),
      goods_class_id,
      goods_name,
      goods_introduce,
      goods_brand,
      goods_weight,
      goods_url,
      marker_price,
      customer_price,
      is_refinement,
      is_discount,
      stock,
      num_view,
      num_comment,
      hasSpec,
      title,
      new_date: nowDate,
    });
    // console.log(result.dataValues.goods_id);
    for (const index in goodsImages) {
      await ctx.model.Goodsimages.create({
        goods_id: result.goods_id, imgurl: goodsImages[index].url, name: goodsImages[index].name, sortNo: index,
      });
    }
    for (const index in goodsSku) {
      await ctx.model.Goodssku.create({
        goods_id: result.goods_id, imgUrl: goodsSku[index].url, num: goodsSku[index].num, name: goodsSku[index].name, price: goodsSku[index].price, sku_type_name: goodsSku[index].sku_type_name, sortNo: index,
      });
    }
    if (result) {
      return {
        code: 20000,
        msg: '新建成功',
      };
    }
  }
  /**
   * 修改商品
   *
   * @param {*} id 商品id
   * @param {*} obj 商品参数
   * @returns
   * @memberof GoodsService
   */
  async updateGoods(id, obj) {
    const {
      goods_class_id,
      goods_name,
      goods_introduce,
      goods_brand,
      goods_weight,
      goods_url,
      marker_price,
      customer_price,
      is_refinement,
      is_discount,
      stock,
      num_view,
      num_comment,
      hasSpec,
      goodsImages,
      goodsSku,
      title,
    } = obj;
    const goods = await this.ctx.model.Goods.findById(id);
    const ctx = this.ctx;
    if (goods) {
      await this.ctx.model.Goods.update({
        goods_class_id,
        goods_name,
        goods_introduce,
        goods_brand,
        goods_weight,
        goods_url,
        marker_price,
        customer_price,
        is_refinement,
        is_discount,
        stock,
        num_view,
        num_comment,
        hasSpec,
        title,
      }, {
        where: { goods_id: id } });
      if (goodsImages) {
        await ctx.model.query('DELETE FROM `goodsImages` where goods_id = :id', { replacements: { id }, type: ctx.model.QueryTypes.DELETE });
        for (const index in goodsImages) {
          await ctx.model.Goodsimages.create({
            goods_id: id, imgurl: goodsImages[index].url, name: goodsImages[index].name, sortNo: index,
          });
        }
      }
      if (goodsSku) {
        for (const index in goodsSku) {
          await ctx.model.Goodssku.create({
            goods_id: id, num: goodsSku[index].num, imgUrl: goodsSku[index].url, name: goodsSku[index].name, price: goodsSku[index].price, sku_type_name: goodsSku[index].sku_type_name, sortNo: index,
          });
        }
      }
      return {
        code: 20000,
        message: '修改成功',
      };
    }
    return {
      status: 500,
      msg: '商品不存在',
    };
  }
  async showOne(id) {
    const goods = await this.ctx.model.Goods.findOne({ where: { goods_id: id } });
    const goodsImages = await this.ctx.model.Goodsimages.findAll({ where: { goods_id: id } });
    const goodsSku = await this.ctx.model.Goodssku.findAll({ where: { goods_id: id } });
    return {
      code: 20000,
      goodsInfo: goods,
      Image: goodsImages,
      Sku: goodsSku,
    };
  }
  async showAll(obj) {
    let { page, limit, goods_name, goods_class_id } = obj;
    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;
    const Op = this.ctx.model.Op;
    const result = await this.ctx.model.Goods.findAndCountAll({
      // eslint-disable-next-line no-undef
      where: { goods_name: { [Op.like]: `%${goods_name}%` }, goods_class_id: { [Op.like]: `%${goods_class_id}%` } }, offset, limit, order: [[ 'created_at', 'DESC' ]] });
    result.page = Number(page);
    result.limit = limit;
    return { code: 20000, result };
  }
  async del(id) {
    const result = await this.ctx.model.Goods.findById(id);
    if (!result) {
      return {
        code: 50000,
        message: '删除失败，不存在',
      };
    }
    result.destroy();
    await this.ctx.model.query('DELETE FROM `goodsimages` where goods_id = :id', { replacements: { id }, type: this.ctx.model.QueryTypes.DELETE });
    await this.ctx.model.query('DELETE FROM `goodsskus` where goods_id = :id', { replacements: { id }, type: this.ctx.model.QueryTypes.DELETE });
    return {
      code: 20000,
      message: '删除成功',
    };
  }
}
module.exports = GoodsService;
