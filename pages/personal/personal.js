const app = getApp();
Page({
  onLoad() {
    this.queryCurrentVolunteer();
    this.queryCurrentTeam();
  },
  data: {
    teamList: [],
    volunteer: {}
  },

  queryCurrentTeam() {
    app.request({
      url: '/current/team',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            teamList: data.data.data
          })   
        }
      }
    })
  },

  queryCurrentVolunteer() {
    app.request({
      url: '/current/volunteer',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            volunteer: data.data
          })   
        }
      }
    })
  },

  toActive() {
    wx.switchTab({
      url: '/pages/volunteer/volunteer'
    })
  }
})