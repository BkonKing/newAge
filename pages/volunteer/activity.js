const app = getApp();
// var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  data: {
    activity: {},
    activityId: '',
    defaultAvatar: '',
    volunteer_status: null,
    lng: undefined,
    lat: undefined
  },
  onLoad(options) {
    this.location()
    this.setData({
      activityId: options.id,
      defaultAvatar: app.globalData.defaultAvatar,
      volunteer_status: app.globalData.userInfo.volunteer_status,
    })
    this.queryActivityContent(options.id)
  },
  location() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          this.getLocation()
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: (res) => {
              this.getLocation()
            }
          })
        }
      }
    })
  },
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.setData({
          lat: res.latitude,
          lng: res.longitude
        })
      }
    })
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
  sign() {
    app.request({
      url: '/activity/' + this.data.activityId + '/sign',
      method: 'post',
      data: {
        lng: this.data.lng,
        lat: this.data.lat
      },
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: '签到成功',
            type: 'success'
          })
          this.queryActivityContent(this.data.activityId)
          // var timeout = setTimeout(() => {
          //   wx.switchTab({
          //     url: '/pages/volunteer/volunteer'
          //   });
          //   clearTimeout(timeout)
          // }, 500);
        } else {
          $Toast({
            content: data.msg,
            type: 'warning'
          });
        }
      }
    })
  },
  signout() {
    app.request({
      url: '/activity/' + this.data.activityId + '/signout',
      method: 'post',
      data: {
        lng: this.data.lng,
        lat: this.data.lat
      },
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: '签退成功',
            type: 'success'
          })
          this.queryActivityContent(this.data.activityId)
        } else {
          $Toast({
            content: data.msg,
            type: 'warning'
          });
        }
      }
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
            content: '报名成功',
            type: 'success'
          });
          var timeout = setTimeout(() => {
            wx.switchTab({
              url: '/pages/volunteer/volunteer',
              success: function () {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
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
  }
})