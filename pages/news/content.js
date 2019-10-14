var WxParse = require('../../wxParse/wxParse.js');

Page({
  onLoad(options) {
    if (options.type) {
      wx.setNavigationBarTitle({
        title: options.type == 'new' ? '新闻' : '文明秀' 
      })
    }
    this.setData({
      info: wx.getStorageSync('newContent')
    });
    WxParse.wxParse('article', 'html', this.data.info.content, this, '100%');
  },
  data: {
    info: {}
  },

})