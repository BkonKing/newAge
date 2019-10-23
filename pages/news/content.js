var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();

Page({
  data: {
    info: {},
    type: '',
    defaultAvatar: ''
  },
  onLoad(options) {
    var title = ''
    this.setData({
      type: options.type,
      defaultAvatar: app.globalData.defaultAvatar
    })
    if (options.type == 'new') {
      title = '新闻'
      this.queryNew(options.id)
    } else {
      title = '文明秀'
      this.queryCivilization(options.id)
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  queryNew(id) {
    app.request({
      url: '/news/' + id,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            info: data.data
          })
          console.log(data.data);
          WxParse.wxParse('article', 'html', data.data.content || '', this, '100%');
        }
      }
    })
  },
  queryCivilization(id) {
    app.request({
      url: '/show/' + id,
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
  },
  look() {
    wx.navigateTo({
      url: '../volunteer/activity?id=' + this.data.info.activity_id
    });
  }
})