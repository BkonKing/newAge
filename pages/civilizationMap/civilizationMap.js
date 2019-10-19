const app = getApp()

Page({
  data: {
    longitude: 0,
    latitude: 0,
    markers: []
  },
  onLoad() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          this.getLocation()
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: (res) => {
              this.getLocation()
            }
          })
        }
      }
    })
  },
  getLocation() {
    wx.getLocation({
      success: res => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        this.queryStation()
      }
    })
  },
  queryStation() {
    app.request({
      url: '/station',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          var stationList = data.data.data.map((obj) => {
            return {
              iconPath: "/static/civilizationMap-checked.png",
              id: 0,
              latitude: 26.0527,
              longitude: 119.31414,
              width: 500,
              height: 500,
              zIndex: 999
            }
          })
          console.log(stationList)
          this.setData({
            markers: stationList
          })
        }
      }
    })
  },
  markertap(e) {
    // console.log(e.markerId)
  }
})