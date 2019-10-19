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
        console.log(data);
        if (data.code == 1) {
          this.setData({
            order: data.data
          })
          // WxParse.wxParse('article', 'html', data.data.content, this, '100%');
        }
      }
    })
  },
  publish() {
    app.request({
      url: '/activ',
      method: 'post',
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: 'success',
            type: '报名成功'
          });
          wx.switchTab({
            url: '/pages/orderMeal/orderMeal'
          });
        } else {
          $Toast({
            content: data.msg,
            type: 'warning'
          });
        }
      }
    })
  },
  callUp: function () {
    wx.makePhoneCall({
      phoneNumber: String(this.data.order.contact_phone)
    })
  }
})