//app.js
App({
  onLaunch: function () {
    // this.getUser()
  },
  request: function (params) {
    if (params.showLoading) {
      wx.showLoading()
    }
    wx.request({
      url: "https://www.upin-cloud.com/api" + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Basic 19ce655ff65026b8e64ce8cdbc050993'
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code == 1) {
          params.success(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500,
            mask: false
          });
        }
      },
      fail: function (ress) {
        wx.hideLoading()
        // console.log(ress)
        params.fail(ress)
      },
      complete: function () {
      }
    })
  },
  getUser: function () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: data => {
          if (data.code) {
            this.request({
              url: '/login',
              method: 'post',
              showLoading: true,
              data: {
                type: 'weixin',
                code: data.code,
                nickname: this.globalData.wxUserInfo.nickName,
                avatar: this.globalData.wxUserInfo.avatarUrl
              },
              success: (data) => {
                this.globalData.token = data.data.token;
                this.request({
                  url: '/currentUser',
                  method: 'get',
                  success: (response) => {
                    this.globalData.userInfo = response.data
                    resolve(response)
                  }
                })
              }
            })
          } else {
            // console.log('获取用户登录态失败！' + res.errMsg);
            reject('error');
          }
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    wxUserInfo: null,
    token: '',
    newContent: {},
    defaultAvatar: 'https://www.upin-cloud.com/uploads/default/avatar.png'
  }
})