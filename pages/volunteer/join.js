const { $Toast } = require('../../iview/base/index');

const app =  getApp();
Page({
  onLoad(options) {
    this.setData({
      activityId: options.id
    })
  },
  formSubmit() {
    app.request({
      url: '/activity/' + this.data.activityId + '/sign',
      method: 'post',
      success: (data) => {
        if (data.code == 1) {
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
  },
  bindChange(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  data: {
    activityId: '',
    name: '',
    age: undefined,
    sex: 0,
    phone: undefined,
    sexArray: ['男','女']
  }
})