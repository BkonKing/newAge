const app = getApp()

Page({

  data: {
    name: '',
    teamList: [],
    total: undefined,
    currentPage: 1,
    defaultAvatar: ''
  },

  onLoad: function () {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    this.queryTeam(1)
  },

  onPullDownRefresh() {
    this.queryTeam(1)
  },

  queryTeam(page) {
    this.queryTeamApi(page).then((data) => {
      this.setData({
        total: data.total,
        teamList: data.data
      })
      wx.stopPullDownRefresh()
    })
  },

  queryTeamApi(page) {
    var url = this.data.name ? `/team?name=${this.data.name}` : '/team?page=' + page
    return new Promise((resolve, reject) => {
      app.request({
        url: url,
        method: 'get',
        success: (data) => {
          if (data.code == 1) {
            resolve(data.data)
          }
        }
      })
    })
  },

  queryMoreTeam(msg) {
    wx.showLoading({
      title: msg
    })
    this.queryTeamApi(this.data.currentPage).then((data) => {
      this.setData({
        total: data.total,
        teamList: this.data.teamList.concat(data.data)
      })
    })
  },

  changeName(e) {
    this.setData({
      name: e.detail.detail.value
    })
    this.queryTeam(1)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (Math.ceil(this.data.total / 20) > this.data.currentPage ) {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      this.queryMoreTeam('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  }
})