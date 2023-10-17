'use strict';

const mongoose = require('mongoose');

module.exports = app => {

  const Schema = new mongoose.Schema({
    dog_name: String,
    dog_age: Number,
    dog_breed: String,
    dog_from: String,
    dog_height: Number,
  },
  {
    timestamps: true,
  }
  );

  return app.mongoose.model('Dog', Schema);
};

// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.User.find({});
// };
