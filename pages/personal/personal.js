Page({
  onLoad() {
    console.log('onLoad');
  },
  data: {
    teamList: [
      {
        newsImage: '',
        huoyue: 12
      },
      {

      }
    ]
  },
  toActive() {
    wx.switchTab({
      url: '/pages/volunteer/volunteer'
    })
  }
})