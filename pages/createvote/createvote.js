// pages/createvote/createvote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    optionList: [
      {
        icon: ''
      },
      {
        icon: ''
      }
    ],
    value1: 2,
  },

  handleFruitChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
  },

  handleChange({ detail }) {
    var _optionList = this.data.optionList;

    var len = detail.value - this.data.value1;

    console.log(len);    

    if(len > 0){
      for(var i = 0; i < len; i++){
        _optionList.push({ icon: '' });
      }
    }
    else if(len < 0){
      len = Math.abs(len);
      for (var i = 0; i < len; i++) {
        _optionList.splice(this.data.value--, 1);
      }
    }

    this.setData({
      optionList: _optionList,
      value1: detail.value
    });

  },

  click: function(){

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