const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
const { $Toast } = require('../../iview/base/index');
Page({
  data: {
    eventInfo: {},
    eventId: '',
    volunteer_status: null
  },
  onLoad(options) {
    this.setData({
      eventId: options.id,
      volunteer_status: app.globalData.userInfo.volunteer_status,
    })
    this.queryEventContent(options.id)
  },
  onPullDownRefresh() {
    this.queryEventContent(this.data.eventId).then(() => {
      wx.stopPullDownRefresh()
    })
  },
  queryEventContent(id) {
    return new Promise((resolve, reject) => {
      app.request({
        url: '/event/' + id,
        method: 'get',
        success: (data) => {
          if (data.code == 1) {
            this.setData({
              eventInfo: data.data
            })
            WxParse.wxParse('article', 'html', data.data.content, this, '100%')
            resolve()
          }
        }
      })
    })
  },
  // signin() {
  //   wx.navigateTo({
  //     url: '../personal/info'
  //   })
  // },
  sign() {
    app.request({
      url: '/event/' + this.data.eventId + '/sign',
      method: 'post',
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: '签到成功',
            type: 'success'
          })
          this.queryEventContent(this.data.eventId)
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
  // apply() {
  //   app.request({
  //     url: '/apply',
  //     method: 'post',
  //     data: {
  //       team_id: this.data.event.team_id
  //     },
  //     success: (data) => {
  //       if (data.code == 1) {
  //         $Toast({
  //           content: '已申请加入，请耐心等待审核',
  //           type: 'success'
  //         });
  //       } else {
  //         $Toast({
  //           content: data.msg,
  //           type: 'warning'
  //         });
  //       }
  //     }
  //   })
  // },
  join() {
    app.request({
      url: '/event/' + this.data.eventId + '/join',
      method: 'post',
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            content: '报名成功',
            type: 'success'
          });
          var timeout = setTimeout(() => {
            wx.switchTab({
              url: '/pages/publicBenefit/publicBenefit',
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
  }
})