// pages/createvote/createvote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    value: "",
    optionList: [
      {
        value: ""
      },
      {
        value: ""
      }
    ],
    value1: 2,
    current: "单选",
    cid: "",
    tid: ""
  },

  titleChange: function(event){
    this.setData({
      title: event.detail.detail.value
    });
  },

  handleCurrentChange({ detail = {} }) {
    this.setData({
      current: detail.value
    });
    // console.log("current: ", this.data.current);
  },

  handleChange({ detail }) {
    var _optionList = this.data.optionList;

    var len = detail.value - this.data.value1;

    console.log(len);    

    if(len > 0){
      for(var i = 0; i < len; i++){
        _optionList.push({ value: '' });
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
    var len = this.data.optionList.length;
    console.log("长度为: ", len);

    var str = "";
    for(var i = 0; i < len; i++){
      str += this.data.optionList[i].value + ".|.";
      //console.log("machi   ", this.data.optionList);
    }

    

    
  },

  myChange: function(event){
    //console.log("value: ", event.currentTarget.dataset.value);
    //console.log("value: ", event.detail.detail.value);
    this.data.optionList[event.currentTarget.dataset.value - 1].value = event.detail.detail.value;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.cid,
      tid: options.tid
    });

    console.log("the cid is ", this.data.cid);
    console.log("the tid is ", this.data.tid);

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