const app = getApp()

Page({
  
  data: {
    total: undefined,
    currentPage: 1,
    hallList: []
  },

  onLoad: function () {
    this.queryHall(1)
  },

  onPullDownRefresh() {
    this.queryHall(1)
  },

  queryHall(page) {
    this.queryHallApi(page).then((data) => {
      this.setData({
        hallList: data.data,
        total: data.total
      })
      wx.stopPullDownRefresh()
    })
  },

  queryMoreHall(msg) {
    wx.showLoading({
      title: msg
    })
    this.queryHallApi(this.data.currentPage).then((data) => {
      this.setData({
        hallList: this.data.hallList.concat(data.data),
        total: data.total
      })
    })
  },

  queryHallApi(page) {
    return new Promise((resolve, reject) => {
      app.request({
        url: '/hall?page=' + page,
        method: 'get',
        success: (data) => {
          if (data.code == 1) {
            resolve(data.data)
          }
        }
      })
    })
  },

  onReachBottom() {
    if (Math.ceil(this.data.total / 20) > this.data.currentPage ) {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      this.queryMoreHall('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  }
})