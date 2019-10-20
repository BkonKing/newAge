const app = getApp()

Page({

  data: {
    teamList: [],
    defaultAvatar: ''
  },

  onLoad: function () {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    this.queryTeam()
  },

  onPullDownRefresh() {
    this.queryTeam()
  },

  queryTeam() {
    app.request({
      url: '/team',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            teamList: data.data.data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  }
})