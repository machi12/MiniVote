// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: "无"
  },

  add: function(){
    wx.cloud.callFunction({
      name: 'add',
      data: {
        uid: "machi12"
      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },

  isUser: function(){
    // wx.cloud.callFunction({
    //   name: 'isUser',
    //   data: {
    //     openid: 'machi12'
    //   },
    //   success: res => {
    //     console.log('callFunction test result: ', res.data);
    //     this.setData({
    //       one: res.data
    //     })
    //   }
    // })

    const db = wx.cloud.database({
      env: 'test-3thxx'
    });
    db.collection('user').where({
      _id: "machi12"
    }).get({
      success: res => {
        console.log("one", res.data);
        this.setData({
          one: res.data[0]._id
        })
      }
    })
    

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