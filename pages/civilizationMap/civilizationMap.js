const app = getApp()

Page({
  data: {
    longitude: 119.015123,
    latitude: 25.431979,
    volunteer_status: 0,
    markers: []
  },
  onLoad() {
    this.setData({
      volunteer_status: app.globalData.userInfo.volunteer_status
    })
    this.getLocation()
  },
  getLocation() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userLocation']) {
          this.queryStation()
        } else {
          wx.authorize({
            scope: "scope.userLocation",
            success: (res) => {
              this.queryStation()
            }
          })
        }
      }
    })
    // this.queryStation()
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: res => {
    //     this.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //     this.queryStation()
    //   }
    // })
  },
  queryStation() {
    app.request({
      url: '/map',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          var stationList = []
          data.data.data.forEach((obj, index) => {
            var lat = parseFloat(obj.lat)
            var lng = parseFloat(obj.lng)
            if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
              var img = obj.map_type == '2' ? "/static/marker.png" : "/static/hall.png"
              stationList.push({
                iconPath: img,
                // callout: {
                //   content: index,
                //   padding: 2,
                //   display: 'ALWAYS'
                // },
                id: index,
                latitude: lat,
                longitude: lng,
                width: '32rpx',
                height: '32rpx',
                zIndex: 999
              })
            }
          })
          this.setData({
            markers: stationList
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },
  onPullDownRefresh() {
    this.getLocation()
  },
  markertap(e) {
    // console.log(e.markerId)
  }
})