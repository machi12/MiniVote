const { $Message } = require('../../dist/base/index');
var app = getApp();

// pages/joinclass/joinclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 提交表单函数
  formSubmit: function (e) {
    const value = e.detail.value.input;
    console.log('form发生了submit事件，携带数据为：', value);
    if (value == "") {
      $Message({
        content: '请输入课程邀请码',
        type: 'error'
      });
    } else {
      const db = wx.cloud.database();
      db.collection('class').where({
        yid: value + ""
      }).get().then(res => {
        console.log(res.data.length);
        if (res.data.length == 0) {
          //console.log(res.data[0]);
          $Message({
            content: '课程邀请码有误',
            type: 'error'
          });
        }
        else {
          var _cname = res.data[0].cname;
          //console.log("cname", cname);

          wx.cloud.callFunction({
            name: 'joinClass',
            data: { 
              cid: value + "",
              mid: app.globalData.openid,
              cname: _cname
            },
            success: res => {
              wx.reLaunch({
                url: '../myclass/myclass?cid=' + value,
              })
            },
            fail: res => {
              $Message({
                content: '加入课程失败',
                type: 'error'
              });
            }
          })
          // .then(res => {
          //   console.log('callFunction test result: ', res);
          //   if (res.errMsg = "cloud.callFunction:ok"){
          //     wx.reLaunch({
          //       url: '../myclass/myclass?cid=' + value,
          //     })
          //   }
          //   else{

          //   }
            //console.log("用户成功添加");
         // })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})