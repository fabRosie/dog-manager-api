module.exports = options => {
  return async function responseTime(ctx, next) {
    const start = Date.now();
    await next();
    const cost = Date.now() - start;
    console.log('response');
    // `options.headerKey` 等价于 `app.config.responseTime.headerKey`
    ctx.set(options.headerKey, `${cost}ms`);
  };
};
