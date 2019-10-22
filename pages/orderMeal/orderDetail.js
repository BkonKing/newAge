const app = getApp();
// var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  data: {
    order: {},
    orderId: '',
    defaultAvatar: '',
    isLeader: false,
    userId: '',
    evaluate: ''
  },
  onLoad(options) {
    let obj = wx.getLaunchOptionsSync()
    if (obj.scene == 1043) {
      app.getUser().then(() => {
        this.toLoad(options.id)
      })
    } else {
      this.toLoad(options.id)
    }
  },
  toLoad(id) {
    this.setData({
      isLeader: app.globalData.isLeader
    })
    this.setData({
      orderId: id,
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
  bindKeyInput (e) {
    this.setData({
      evaluate: e.detail.value
    })
  },
  toActivity() {
    wx.navigateTo({
      url: '../volunteer/activity?id=' + this.data.order.activity_id
    })
  },
  toStartActivity() {
    wx.navigateTo({
      url: '../volunteer/activityStart?orders_id=' + this.data.orderId
    })
  }
})