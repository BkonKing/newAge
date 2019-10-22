const app = getApp()

Page({

  data: {
    name: '',
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
    var url = this.data.name ? `/team?name=${this.data.name}` : '/team'
    app.request({
      url: url,
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