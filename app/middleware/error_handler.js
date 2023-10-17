'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.app.emit('error', error, ctx);
      ctx.status = error.status;
      if (error.status === 422) {
        ctx.body = {
          msg: '参数错误',
          data: error.errors,
        };
        return;
      }
      ctx.body = {
        msg: 'fail',
        data: error.message,
      };
    }
  };
};
