const app =  getApp();

Page({
  data: {
    current: 'tab2',
    defaultAvatar: '',
    isLeader: false,
    activityList: []
  },

  onLoad() {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    if (app.globalData.userInfo.lead_team.length > 0) {
      this.setData({
        isLeader: true
      })
    }
    this.queryCurrentActivity()
    this.queryActivity()
  },

  onPullDownRefresh() {
    this.setData({
      current: 'tab2'
    })
    this.queryActivity()
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    // if (detail.key == 'tab1') {
    //   this.queryCurrentActivity()
    // } else {
    //   this.queryActivity()
    // }
  },

  queryActivity() {
    app.request({
      url: '/activity',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            activityList: data.data.data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  queryCurrentActivity() {
    app.request({
      url: '/current/activity',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            activityList: data.data.data
          })   
        }
      }
    })
  },

  toActivityStart() {
    wx.navigateTo({
      url: './activityStart'
    })
  }
})