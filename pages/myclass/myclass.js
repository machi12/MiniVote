var app = getApp();

// pages/myclass/myclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cname: "高等数学",
    cid: "ASER6677QS",
    visible: false
  },

  queryMember: function(){
    wx.navigateTo({
      url: "../classMember/classMember?cid=" + this.data.cid
    })
  },

  vote: function(){
    wx.navigateTo({
      url: "../vote/vote?cid=" + this.data.cid
    })
  },

  myVote: function () {
    wx.navigateTo({
      url: "../myvote/myvote?cid=" + this.data.cid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("this a happy year", options.cid);

    const cid = options.cid;

    const db = wx.cloud.database();

    db.collection('class').where({
      _id: cid
    }).field({
      cname: true,
      _id: false
    }).get({
      success: res => {
        console.log("success", res.data);
        this.setData({
          cname: res.data[0].cname,
          cid: cid
        });
        console.log(this.data.cname);
        console.log(this.data.cid);
      }
    });
    
    db.collection('class').where({
      tid: app.globalData.openid,
      _id: cid
    }).get({
      success: res => {
        if(res.data.length == 1){
          this.setData({
            visible: true
          })
        }else{
          this.setData({
            visible: false
          })
        }
      }
    })
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