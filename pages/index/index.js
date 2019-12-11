//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    visible: false,
    canIUse: wx.canIUse('button.open-type.getwxUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    app.getUser().then(() => {
      wx.switchTab({
        url: '../personal/personal'
      })
    })
  },
  onLoad: function () {
    console.log('asdfasdfds');
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.wxUserInfo = res.userInfo
              this.bindViewTap();
            }
          })
        } else {
          this.setData({
            visible: true
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.wxUserInfo = e.detail.userInfo;
    this.bindViewTap();
  }
})
