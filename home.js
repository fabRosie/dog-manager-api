'use strict';

const { Controller } = require('egg');
// const { v4: uuidv4 } = require('uuid');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    ctx.body = await ctx.model.Dog.find({});
  }
  async create() {
    const { ctx } = this;
    const data = await ctx.model.Dog.create({
      ...ctx.request.body,
    });
    ctx.body = {
      code: 200,
      msg: '创建成功',
      data,
    };
  }

  async find() {
    const { ctx } = this;
    ctx.validate({
      dog_name: { type: 'string', required: true, desc: '犬名' },
      dog_age: { type: 'number', required: true, desc: '年龄' },
      dog_breed: { type: 'string', required: true, desc: '犬种' },
      dog_from: { type: 'string', required: true, desc: '犬产地' },
    });
    // if (ctx.paramErrors) {
    //   throw ctx.paramErrors;
    // }
    const { dog_name, dog_breed, dog_from, ...rest } = ctx.request.body;
    const dogs = await ctx.model.Dog.find(
      {
        dog_name: { $regex: dog_name, $options: 'i' },
        dog_breed: { $regex: dog_breed, $options: 'i' },
        dog_from: { $regex: dog_from, $options: 'i' },
        ...rest,
      }
    );
    if (dogs.length < 1) {
      ctx.body = {
        code: 200,
        msg: '无结果',
      };
      return;
    }
    ctx.body = {
      code: 200,
      msg: 'success',
      data: dogs,
    };
  }

  async update() {
    const { ctx } = this;
    const { _id } = ctx.request.body;
    await ctx.model.Dog.findByIdAndUpdate(_id, { ...ctx.request.body });
    ctx.body = {
      code: 200,
      msg: '更新成功',
      data: ctx.request.body,
    };
  }

  async destroy() {
    const { ctx } = this;
    const { _id } = ctx.request.body;
    await ctx.model.Dog.findByIdAndDelete(_id);
    ctx.body = {
      code: 200,
      msg: '删除成功',
    };
  }

}

module.exports = HomeController;
