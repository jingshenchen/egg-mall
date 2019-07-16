/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class AddressService extends Service {
  /**
   *
   *根据用户id查询所有地址
   * @return
   * @memberof AddressService
   */
  async showAll(id) {
    const results = await this.ctx.model.Address.findAll({ where: { customer_id: id } });
    return results;
  }
  /**
   * 新建地址
   * @param {*} obj
   * @memberof AddressService
   */
  async newAddress(obj) {
    const {
      customer_id,
      name,
      address,
      tel,
      postcode,
      type,
    } = obj;
    const ctx = this.ctx;
    const result = await ctx.model.Address.create({
      customer_id,
      name,
      address,
      tel,
      postcode,
      type,
    });
    if (result) {
      return {
        code: 0,
        msg: '新增成功',
      };
    }
    return {
      code: 1,
      msg: '新增失败',
    };
  }
  async updateAddress(addressId, obj) {
    const {
      name,
      address,
      tel,
      postcode,
      type,
    } = obj;
    const result = await this.ctx.model.Address.findById(addressId);
    if (result) {
      await this.ctx.model.Address.update({
        name,
        address,
        tel,
        postcode,
        type,
      }, {
        where: { id: addressId },
      });
    } else {
      return {
        code: 1,
        msg: '地址不存在',
      };
    }
    return {
      code: 0,
      msg: '保存成功',
    };
  }
}

module.exports = AddressService;
