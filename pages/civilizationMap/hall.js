const app = getApp()

Page({
  
  data: {
    hallList: []
  },

  onLoad: function () {
    this.queryHall()
  },

  onPullDownRefresh() {
    this.queryHall()
  },

  queryHall() {
    app.request({
      url: '/hall',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            hallList: data.data.data
          })   
        }
      }
    })
  }
})