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
    this.queryOrderContent()
  },
  queryOrderContent() {
    app.request({
      url: '/orders/' + this.data.orderId,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            order: data.data,
            evaluate: data.data.comment
          })
          // WxParse.wxParse('article', 'html', data.data.content, this, '100%');
        }
      }
    })
  },
  publish() {
    app.request({
      url: '/orders/' + this.data.orderId,
      method: 'put',
      data: {
        comment: this.data.evaluate 
      },
      success: (data) => {
        if (data.code == 1) {
          this.queryOrderContent()
          $Toast({
            content: '发表评论成功',
            type: 'success'
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
  callUp() {
    wx.makePhoneCall({
      phoneNumber: String(this.data.order.contact_phone)
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      evaluate: e.detail.value
    })
  },
  toActivity() {
    wx.navigateTo({
      url: '../volunteer/activity?id=' + this.data.order.activity_id
    });
  }
})