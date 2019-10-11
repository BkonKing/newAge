//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  request: function(url, method, data, successCallback, errorCallback) {
    // wx.showLoading()
    wx.request({
      url: "http://csadmin.upin-cloud.com/api" + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Basic 19ce655ff65026b8e64ce8cdbc050993'
      },
      success: function (res) {
        successCallback(res)
      },
      fail: function (ress) {
        // console.log(ress)
        errorCallback(ress)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  globalData: {
    userInfo: null,
    imgurl: "/static/images"
  }
})