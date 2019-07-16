/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
  async showMyAllOrder(obj) {
    // const {
    //   userId,
    // } = obj;
    let orders;
    if (!obj.type) {
      orders = await this.ctx.model.Order.findAll({ where: { customer_id: obj.userId } });
    } else {
      orders = await this.ctx.model.Order.findAll({ where: { customer_id: obj.userId, order_status: obj.type } });
    }
    for (const order of orders) {
      // console.log(order);
      const goods = await this.ctx.model.Ordergoods.findAll({ where: { order_id: order.order_id } });
      order.goods_id = goods;
    }
    return orders;
  }
  async showOne(id) {
    const results = await this.ctx.model.Order.findById(id);
    const Ordergoods = await this.ctx.model.Ordergoods.findAll({ where: { order_id: id } });
    return {
      results,
      goods: Ordergoods,
    };
  }
  async newOrder(obj) {
    const UUID = require('uuid');
    const {
      customer_id,
      order_date,
      total_price,
      ship_fee,
      pay_type,
      receive_name,
      receive_phone,
      receive_postcode,
      receive_address,
      order_status,
      orderGoods,
    } = obj;
    const ctx = this.ctx;
    const result = await ctx.model.Order.create({
      order_id: UUID.v4(),
      customer_id,
      order_date,
      total_price,
      ship_fee,
      pay_type,
      receive_name,
      receive_phone,
      receive_postcode,
      receive_address,
      order_status,
    });
    for (const index in orderGoods) {
      await ctx.model.Ordergoods.create({
        order_id: result.order_id, goods_id: orderGoods[index].goods_id, goods_url: orderGoods[index].goods_url, customer_price: orderGoods[index].nowPrice, goods_name: orderGoods[index].goods_name, num: orderGoods[index].num, sortNo: index,
      });
    }
    if (result) {
      return { order_id: result.order_id };
    }
    return {
      code: 1,
      msg: '新增失败',
    };
  }
  async showMyOrderNum(id) {
    // 0: 待支付， 1：待发货， 2：待收货， 3：待评价，4：已完成, 5: 已取消
    const unpayArray = await this.ctx.model.Order.findAll({ where: { order_status: 0, customer_id: id } });
    const unsendArray = await this.ctx.model.Order.findAll({ where: { order_status: 1, customer_id: id } });
    const unreceiveArray = await this.ctx.model.Order.findAll({ where: { order_status: 2, customer_id: id } });
    const uncommentArray = await this.ctx.model.Order.findAll({ where: { order_status: 3, customer_id: id } });
    const unrefundArray = await this.ctx.model.Order.findAll({ where: { order_status: 4, customer_id: id } });
    return {
      unpay: unpayArray.length,
      unsend: unsendArray.length,
      unreceive: unreceiveArray.length,
      uncomment: uncommentArray.length,
      unrefund: unrefundArray.length,
    };
  }
  /**
   *获取所有订单
   *
   * @param {*} obj
   * @returns
   * @memberof OrderService
   */
  async showAll(obj) {
    let { page, limit, order_id } = obj;
    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;
    const Op = this.ctx.model.Op;
    const result = await this.ctx.model.Order.findAndCountAll({
      where: { order_id: { [Op.like]: `%${order_id}%` } }, offset, limit, order: [[ 'order_date', 'DESC' ]] });
    for (const order of result.rows) {
      // console.log(order);
      const goods = await this.ctx.model.Ordergoods.findAll({ where: { order_id: order.order_id }, order: [[ 'created_at', 'DESC' ]] });
      order.goods_id = goods;
    }
    result.page = Number(page);
    result.limit = limit;
    return { code: 20000, result };
  }
  async updateStatus(id, obj) {
    const {
      order_status,
    } = obj;
    const results = await this.ctx.model.Order.findById(id);
    if (results) {
      await this.ctx.model.Order.update({
        order_status,
      }, {
        where: { order_id: id } });
    }
    return {
      code: 20000,
      message: '修改成功',
    };
  }
}

module.exports = OrderService;
