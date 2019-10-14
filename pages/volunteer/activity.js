const app =  getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  onLoad(options) {
    this.setData({
      activityId: options.id
    })
    app.request({
      url: '/activity/' + options.id,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            activity: data.data
          })
          WxParse.wxParse('article', 'html', data.data.content, this, '100%');
        }
      }
    })
  },
  join() {
    wx.navigateTo({
      url: './join?id=' + this.data.activityId
    })
  },
  data: {
    activity: {},
    activityId: ''
  }
})