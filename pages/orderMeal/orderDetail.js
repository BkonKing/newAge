const app = getApp();
// var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  data: {
    order: {},
    orderId: '',
    defaultAvatar: '',
    userId: '',
    evaluate: ''
  },
  onLoad(options) {
    this.setData({
      orderId: options.id,
      defaultAvatar: app.globalData.defaultAvatar,
      userId: app.globalData.userInfo.id
    })
    app.request({
      url: '/orders/' + options.id,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            order: data.data
          })
          // WxParse.wxParse('article', 'html', data.data.content, this, '100%');
        }
      }
    })
  },
  join() {
    app.request({
      url: '/activity/' + this.data.orderId + '/join',
      method: 'post',
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: 'success',
            type: '报名成功'
          });
          wx.switchTab({
            url: '/pages/volunteer/volunteer'
          });
        } else {
          $Toast({
            content: data.msg,
            type: 'warning'
          });
        }
      }
    })
    // wx.navigateTo({
    //   url: './join?id=' + this.data.orderId
    // })
  }
})