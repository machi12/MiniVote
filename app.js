//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      //初始化云环境
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              //console.log(this.globalData.userInfo);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          // 未授权，跳转到授权页面
          wx.reLaunch({
            url: '/pages/login/login',
          })
        }
      }
    });

    // 调用云函数,获取用户的openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        this.globalData.openid = res.result.openid;
        console.log(this.globalData.openid);

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
        console.log(this.globalData.openid);

        db.collection('user').where({
          _id: this.globalData.openid
        }).get().then(res => {
          console.log(res.data.length);
          if (res.data.length == 0) {
            //console.log(res.data[0]);
            wx.cloud.callFunction({
              name: 'add',
              data: {
                uid: this.globalData.openid
              }
            }).then(res => {
              console.log('callFunction test result: ', res);
              console.log("用户成功添加");
            })
          }
          else {
            console.log(res.data[0]);
            console.log("该用户已经存在");
          }
        });

        db.collection('class').where({
          tid: this.globalData.openid
        }).field({
          cname: true,
          _id: false
        }).get({
          success: res => {
            console.log("查询成功", res.data);
            this.globalData.teach = res.data;
            // console.log("teach: ", this.globalData.teach);
            // console.log("teach: ", this.globalData.listen);
          }
        });

        // 为teach数组赋值
        db.collection('class').where({
          tid: this.globalData.openid
        }).field({
          cname: true,
          _id: false
        }).get({
          success: res => {
            console.log("查询成功", res.data);
            this.globalData.teach = res.data;
            // console.log("teach: ", this.globalData.teach);
            // console.log("teach: ", this.globalData.listen);
          }
        });

        // 为listen数组赋值
        db.collection('classmember').where({
          mid: this.globalData.openid
        }).field({
          cname: true,
          _id: false
        }).get({
          success: res => {
            console.log("查询成功", res.data);
            this.globalData.listen = res.data;
            console.log("listen: ", this.globalData.listen);
            // console.log("teach: ", this.globalData.listen);
          }
        });

      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    });

  },
  
  globalData: {
    userInfo: null,
    openid: null,
    appid: 'wxabda5fe0c796b4ad',
    secret: '6312dce59b9c56b90c7145db90200c1c',
    teach: [],
    listen: []
  }
  
})

