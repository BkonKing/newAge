const app =  getApp();

Page({
  data: {
    orderList: []
  },
  onLoad() {
    this.queryOrderList()
  },
  onPullDownRefresh() {
    this.queryOrderList()
  },
  queryOrderList() {
    app.request({
      url: '/orders',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            orderList: data.data.data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },
  toAdd() {
    wx.navigateTo({
      url: './orderStart'
    });
  }
})