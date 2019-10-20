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
      url: '/map',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          var stationList = []
          data.data.data.forEach((obj) => {
            var lat = parseFloat(obj.lat)
            var lng = parseFloat(obj.lng)
            if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
              var img = obj.map_type == '1' ? "/static/marker.png" : "/static/hall.png"
              stationList.push({
                iconPath: img,
                id: 0,
                latitude: lat,
                longitude: lng,
                width: 16,
                height: 16,
                zIndex: 999
              })
            }
          })
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