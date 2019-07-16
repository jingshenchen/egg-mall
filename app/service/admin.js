/* eslint-disable valid-jsdoc */
'use strict';
const Service = require('egg').Service;

class AdminService extends Service {
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
    const user = await ctx.model.Admin.findOne({ where: { admin: name } });
    if (user && !user.token) {
      // 生成Token
      const newToken = ctx.service.admin.createToken({ id: user.admin_id });
      // 存入表中
      await ctx.model.Admin.update({
        token: newToken,
      }, {
        where: { admin_id: user.admin_id } });
      return {
        code: 20000,
        userId: user.admin_id,
        token: user.token,
      };
    }
    if (!user) {
      return false;
    }
    return {
      code: 20000,
      userId: user.admin_id,
      token: user.token,
    };
    // return user.admin_id;
  }
  /**
   * 新建用户
   *
   * @param {*} obj
   * @returns
   * @memberof CustomerService
   */
  async newCustomers(obj) {
    const {
      admin,
      admin_password,
      type,
    } = obj;
    const ctx = this.ctx;
    const user = await ctx.model.Admin.findOne({ where: { admin } });
    if (user) {
      return {
        status: 500,
        msg: '管理员用户名已存在!',
      };
    }
    console.log(admin, admin_password, type);
    const result = await ctx.model.Admin.create({
      admin,
      admin_password,
      type,
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

    const user = await this.ctx.model.Admin.findById(id);
    if (user) {
      await this.ctx.model.Admin.update({
        password,
        photo,
        age,
        true_name,
        address,
        phone,
        postcode,
      }, {
        where: { admin_id: id },
      });
    } else {
      return {
        status: 500,
        msg: '用户不存在',
      };
    }
  }
  async showAll() {
    const results = await this.ctx.model.Admin.findAll();
    return results;
  }
  async showOne(id) {
    const results = await this.ctx.model.Admin.findOne({ where: { admin_id: id } });
    if (results) {
      return results;
    }
    return {
      status: 500,
      msg: '表中无该用户',
    };
  }
  async getAdminInfo(newtoken) {
    console.log(newtoken);
    const results = await this.ctx.model.Admin.findOne({ where: { token: newtoken } });
    return {
      name: results.admin,
      avatar: results.avatar,
      roles: [ results ],
      code: 20000,
    };
  }
}

module.exports = AdminService;
