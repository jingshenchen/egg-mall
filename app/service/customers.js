/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class CustomerService extends Service {
  /**
 * 生成 Token
 * @param {Object} data
 */
  createToken(data) {
    return this.app.jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: '12h',
    });
  }
  /**
 * 验证token的合法性
 * @param {String} token
 */
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      this.app.jwt.verify(token, this.app.config.jwt.secret, function(err, decoded) {
        const result = {};
        if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
          console.log(err);
          result.verify = false;
          result.message = err.message;
        } else {
          result.verify = true;
          result.message = decoded;
        }
        resolve(result);
        reject(err);
      });
    });
  }
  async checkAccount(name) {
    const ctx = this.ctx;
    const user = await ctx.model.Customers.findOne({ where: { name } });
    if (user && !user.token) {
      // 生成Token
      const newToken = ctx.service.customers.createToken({ id: user.customer_id });
      // 存入表中
      await ctx.model.Customers.update({
        token: newToken,
      }, {
        where: { customer_id: user.customer_id } });
      return {
        userId: user.customer_id,
        token: newToken,
      };
    }
    if (!user) {
      return false;
    }
    return {
      userId: user.customer_id,
      token: user.token,
    };
    // return user.customer_id;
  }
  /**
   * 新建用户
   *
   * @param {*} obj
   * @returns
   * @memberof CustomerService
   */
  async newCustomers(obj) {
    const UUID = require('uuid');
    const {
      name,
      password,
      photo,
      age,
      true_name,
      address,
      phone,
      postcode,
    } = obj;
    const ctx = this.ctx;
    const user = await ctx.model.Customers.findOne({ where: { name } });
    if (user) {
      return {
        code: 500,
        msg: '用户名已存在!',
      };
    }
    console.log(name, password, photo, age, true_name, address, phone, postcode);
    const result = await ctx.model.Customers.create({
      customer_id: UUID.v4(),
      name,
      password,
      photo,
      age,
      true_name,
      address,
      phone,
      postcode,
    });
    if (result) {
      return {
        status: 200,
        msg: '注册成功',
      };
    }

  }
  /**
   *更新数据
   *
   * @param {*} id
   * @param {*} obj
   * @returns
   * @memberof CustomerService
   */
  async updateCustomers(id, obj) {
    const {
      password,
      photo,
      age,
      true_name,
      address,
      phone,
      postcode,
    } = obj;

    const user = await this.ctx.model.Customers.findById(id);
    if (user) {
      await this.ctx.model.Customers.update({
        password,
        photo,
        age,
        true_name,
        address,
        phone,
        postcode,
      }, {
        where: { customer_id: id },
      });
    } else {
      return {
        status: 500,
        msg: '用户不存在',
      };
    }
  }
  async showAll() {
    const results = await this.ctx.model.Customers.findAll();
    return results;
  }
  async showOne(id) {
    const results = await this.ctx.model.Customers.findOne({ where: { customer_id: id } });
    if (results) {
      return results;
    }
    return {
      status: 500,
      msg: '表中无该用户',
    };
  }
}

module.exports = CustomerService;
