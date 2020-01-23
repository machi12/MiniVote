// 关于本示例的 $Message ，可以查看 Message 组件的介绍

const { $Message } = require('../../dist/base/index');

Page({
  data: {
    one: ""
  },

  //生成唯一不重复ID
  generateUuid: function (length = 2) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  },

  onLoad: function (options) {
   this.setData({
     one: this.generateUuid()
   }) 
  }
});
