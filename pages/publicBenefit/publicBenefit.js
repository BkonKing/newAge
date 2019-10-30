const app =  getApp();

Page({
  data: {
    defaultAvatar: '',
    eventList: [],
    myEventList: []
  },

  onLoad() {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    // this.queryCurrentEvent()
    this.queryEvent()
  },

  onPullDownRefresh() {
    // this.queryCurrentEvent()
    this.queryEvent()
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  queryEvent() {
    app.request({
      url: '/event',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            eventList: data.data.data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  queryCurrentEvent() {
    app.request({
      url: '/current/event',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            myEventList: data.data.data
          })   
        }
      }
    })
  }
})