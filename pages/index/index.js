var app = getApp();

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesList:[
      {
        id:"01",
        src:"/images/one.jpg"
      },
      {
        id: "02",
        src: "/images/two.jpg"
      },
      {
        id: "03",
        src: "/images/three.jpg"
      }
    ],
    current: 'tab1',
    visible1: false,
    actions1: [
      {
        name: '创建课程',
      },
      {
        name: '加入班级'
      }
    ]
  },

  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },

  // 点击选择创建课程或者加入班级
  handleClickItem1({ detail }) {
    const index = detail.index;

    if(index == 0){
      console.log("按钮1被点击");
      wx.reLaunch({
        url: '../createClass/createClass',
      })
    }
    else if(index == 1){
      console.log("按钮2被点击");
    }
    else{
      console.log("action-sheet is error");
    }
  },
  
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  // tabs的点击事件
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
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