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
    ],
    classList: []
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
      wx.navigateTo({
        url: '../createClass/createClass',
      })
    }
    else if(index == 1){
      console.log("按钮2被点击");
      wx.navigateTo({
        url: '../joinclass/joinclass',
      })
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
    console.log("key", detail.key);

    if(detail.key == "tab1"){
      this.setData({
        classList: app.globalData.teach
      });
    }
    else if(detail.key == "tab2"){
      this.setData({
        classList: app.globalData.listen
      });
    }
  },

  // 点击card触发的事件(转到myclass页面)
  enterPage: function(event){
    //console.log("进入我的课程");
    // 获取cid
    var cid = event.currentTarget.dataset.value;
    
    //console.log("点击", cid);
    wx.navigateTo({
      url: "../myclass/myclass?cid=" + cid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 调用云函数,获取用户的openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        //console.log('[云函数] [login] user openid: ', res.result.openid);

        app.globalData.openid = res.result.openid;

        //console.log(app.globalData.openid);

        //console.log("machi", this.globalData.openid);
        const db = wx.cloud.database({
          env: 'test-3thxx'
        });
        // db.collection('user').where({
        //   _id: this.globalData.openid
        // }).get({
        //   success: res => {
        //     console.log("one", res.data[0]._id);
        //     if (res.data[0]._id == null) {
        //       wx.cloud.callFunction({
        //         name: 'add',
        //         data: {
        //           uid: "one"
        //         },
        //         complete: res => {
        //           console.log('callFunction test result: ', res);
        //           console.log("用户成功添加");
        //         }
        //       })
        //     }
        //     else {
        //       console.log("该用户已经存在");
        //     }
        //   }
        // })
        // console.log(app.globalData.openid);

        db.collection('user').where({
          _id: app.globalData.openid
        }).get().then(res => {
          // console.log(res.data.length);
          if (res.data.length == 0) {
            //console.log(res.data[0]);
            wx.cloud.callFunction({
              name: 'add',
              data: {
                uid: app.globalData.openid
              }
            }).then(res => {
              // console.log('callFunction test result: ', res);
              // console.log("用户成功添加");
            })
          }
          else {
            // console.log(res.data[0]);
            console.log("该用户已经存在");
          }
        });

        // 为teach数组赋值
        db.collection('class').where({
          tid: app.globalData.openid
        }).field({
          cname: true,
          _id: true
        }).get({
          success: res => {
            // console.log("查询成功", res.data);
            app.globalData.teach = res.data;
            this.setData({
              classList: app.globalData.teach
            });
            // console.log("teach: ", this.globalData.teach);
            // console.log("teach: ", this.globalData.listen);
          }
        });

        // 为listen数组赋值
        db.collection('classmember').where({
          mid: app.globalData.openid
        }).field({
          cname: true,
          _id: true
        }).get({
          success: res => {
            // console.log("查询成功", res.data);
            app.globalData.listen = res.data;
            // console.log("listen: ", app.globalData.listen);
            // console.log("teach: ", app.globalData.teach);
          }
        });

        console.log("end");

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
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