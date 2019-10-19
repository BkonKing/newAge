// var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
    info: {}
  },
  onLoad(options) {
    this.queryHallDetail(options.id)
  },
  queryHallDetail(id) {
    app.request({
      url: '/hall/' + id,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            info: data.data
          })
          // WxParse.wxParse('article', 'html', data.data.content, this, '100%');
        }
      }
    })
  }
})