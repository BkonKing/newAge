const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  onLoad(options) {
    this.setData({
      activityId: options.id,
      defaultAvatar: app.globalData.defaultAvatar
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
    app.request({
      url: '/activity/' + this.data.activityId + '/join',
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
    //   url: './join?id=' + this.data.activityId
    // })
  },
  data: {
    activity: {},
    activityId: '',
    defaultAvatar: ''
  }
})