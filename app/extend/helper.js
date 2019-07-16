'use strict';
// 获取token;
exports.getAccessToken = ctx => {
  const bearberToken = ctx.request.header.authorization;
  return bearberToken && bearberToken.replace('Bearer', '');
};

// 校验Token
exports.verifyToken = async (ctx, userId) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.user.verifyToken(token);
  if (!verifyResult.verify) {
    ctx.helper.error(ctx, 401, verifyResult.message);
    return false;
  }
  if (userId !== verifyResult.message.id) {
    ctx.header.error(ctx, 401, '用户ID与Token不一致！');
    return false;
  }
  return true;
};

// 处理成功响应
exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    msg: message,
    data: result,
  };
  ctx.status = status;
};

// 处理失败响应
exports.error = (ctx, codeNum, message) => {
  ctx.body = {
    code: codeNum,
    meg: message,
  };
  ctx.status = codeNum;
};
module.exports = {
  async verifyToken(ctx, userId) {
    const token = this.getAccessToken(ctx);
    const verifyResult = await ctx.service.customers.verifyToken(token);
    if (!verifyResult.verify) {
      this.ctx.helper.error(ctx, 401, verifyResult.message);
      return false;
    }
    if (userId !== verifyResult.message.id) {
      this.ctx.helper.error(ctx, 401, '用户ID与Token不一致！');
      return false;
    }
    return true;
  },
  getAccessToken(ctx) {
    const bearberToken = ctx.request.header.authorization;
    return bearberToken && bearberToken.replace('Bearer', '');
  },
  error(ctx, codeNum, message) {
    ctx.body = {
      code: codeNum,
      meg: message,
    };
    ctx.status = codeNum;
  },
};
