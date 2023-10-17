'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/create', controller.home.create);
  router.del('/delete', controller.home.destroy);
  router.post('/update', controller.home.update);
  router.get('/find', controller.home.find);
};
