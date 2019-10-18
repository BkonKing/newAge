const app = getApp()

Page({
  data: {
    longitude: 0,
    latitude: 0,
    markers: [{
      iconPath: "",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 50,
      height: 50
    }]
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
        this.setData({
          latitude: parseFloat("234.000000"),
          longitude: parseFloat("123.000000")
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
          console.log(data.data.data);
          var stationList = data.data.data.map((obj) => {
            return {
              iconPath: "",
              id: obj.id,
              latitude: obj.lat,
              longitude: obj.lng,
              width: 50,
              height: 50
            }
          })
        }
      }
    })
  },
  markertap(e) {
    // console.log(e.markerId)
  }
})