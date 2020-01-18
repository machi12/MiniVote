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
  },
  globalData: {
    userInfo: null
  }
})