const app = getApp();
// var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  onLoad(options) {
    this.setData({
      activityId: options.id,
      defaultAvatar: app.globalData.defaultAvatar
    })
    this.queryActivityContent(options.id)
  },
  onPullDownRefresh() {
    this.queryActivityContent(this.data.activityId).then(() => {
      wx.stopPullDownRefresh()
    })
  },
  queryActivityContent(id) {
    return new Promise((resolve, reject) => {
      app.request({
        url: '/activity/' + id,
        method: 'get',
        success: (data) => {
          if (data.code == 1) {
            this.setData({
              activity: data.data
            })
            // WxParse.wxParse('article', 'html', data.data.content, this, '100%')
            resolve()
          }
        }
      })
    })
  },
  signin() {
    wx.navigateTo({
      url: '../personal/info'
    })
  },
  apply() {
    app.request({
      url: '/apply',
      method: 'post',
      data: {
        team_id: this.data.activity.team_id
      },
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: '已申请加入，请耐心等待审核',
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
          var timeout = setTimeout(() => {
            wx.switchTab({
              url: '/pages/volunteer/volunteer'
            });
            clearTimeout(timeout)
          }, 500);
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