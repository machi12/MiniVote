var app = getApp();

// pages/myvote/myvote.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: "",
    tid: "",
    current: 'tab1',
    voteList: [],
    prestoreVote: [],
    publishVote: [],
    a: true,
    b: false
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });

    if (detail.key == "tab1"){
      this.setData({
        voteList: this.data.publishVote,
        a: true,
        b: false
      });

      console.log("tab1, ", this.data.voteList);
    }
    else if (detail.key == "tab2"){
      this.setData({
        voteList: this.data.prestoreVote,
        a: false,
        b: true
      });

      console.log("tab2, ", this.data.voteList);
    }else{
      console.log("error");
    }
  },

  createVote: function(){
    wx.navigateTo({
      url: "../createvote/createvote?cid=" + this.data.cid + "&tid=" + this.data.tid
    })
  },

  enterVote: function(event){

    var vid = event.currentTarget.dataset.value;
    // console.log("the value is     ",event.currentTarget.database.value);

    wx.navigateTo({
      url: "../thisvote/thisvote?vid=" + vid
    })
  },

  publishVote: function(event){

    var vid = event.currentTarget.dataset.value;

    // console.log("the value is     ", _id);

    wx.cloud.callFunction({
      name: 'updateVote',
      data: {
        _id: vid
      },
      success: res => {
        this.onLoad();
      }
    });

    console.log("this is called");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if(this.data.cid == "" && this.data.tid == ""){
      this.setData({
        cid: options.cid,
        tid: options.tid 
      });
    }

    this.setData({
      current: 'tab1',
      a: true,
      b: false
    });

    const db = wx.cloud.database();

    db.collection('vote').where({
      tid: app.globalData.openid + "",
      status: 0
    }).field({
      _id: true,
      title: true
    }).get({
      success: res => {
        this.setData({
          prestoreVote: res.data
        });

        console.log("prestoreVote: ", this.data.prestoreVote);
      }
    });

    db.collection('vote').where({
      tid: app.globalData.openid + "",
      status: 1
    }).field({
      _id: true,
      title: true
    }).get({
      success: res => {
        this.setData({
          publishVote: res.data,
          voteList: res.data
        });

        console.log("publishVote: ", this.data.prestoreVote);

      }
    });


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