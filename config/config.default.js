/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1552446668419_8716';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.sequelize = {
    username: 'jingshenchen',
    password: '120189qaz',
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'egg-sequelize-doc-default',
    operatorsAliases: false,
    timezone: '+08:00',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'chenjingshen',
      // 密码
      password: '120189qaz',
      // 数据库名
      database: 'egg-sequelize-doc-default',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.jwt = {
    enable: false,
    secret: '123456',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://192.168.43.83:8080', 'http://192.168.43.163:8080', 'http://192.168.1.104:8080' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.cluster = {
    listen: {
      port: 7001, // 端口
      // hostname: '192.168.43.83',
      hostname: '192.168.43.163', // 你的IP
      // hostname: '192.168.1.104', // 你的IP
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
