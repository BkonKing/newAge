const app =  getApp();

Page({
  data: {
    current: 'tab2',
    eventList: [],
    myEventList: []
  },

  onLoad() {
    this.queryCurrentEvent()
    this.queryEvent()
  },

  onPullDownRefresh() {
    this.setData({
      current: 'tab2'
    })
    this.queryCurrentEvent()
    this.queryEvent()
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    })
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