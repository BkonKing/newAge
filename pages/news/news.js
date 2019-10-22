const app = getApp();

Page({
  data: {
    current: 'tab1',
    newList: [],
    defaultAvatar: '',
    civilizationList: [],
    bannerList: []
  },

  onLoad() {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    this.queryData();
  },

  onPullDownRefresh() {
    this.queryData()
  },

  queryData() {
    this.queryBanner()
    this.queryNewList()
    this.queryCivilizationList()
  },

  queryNewList() {
    app.request({
      url: '/news',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            newList: data.data.data
          })
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  queryCivilizationList() {
    app.request({
      url: '/show',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            civilizationList: data.data.data
          })   
        }
      }
    })
  },

  queryBanner() {
    app.request({
      url: '/banner',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            bannerList: data.data.data
          })   
        }
      }
    })
  },

  navigator(e) {
    var type = this.data.current == 'tab1' ? 'new' : 'show'
    const params = e.currentTarget.dataset.param
    wx.navigateTo({
      url: `./content?type=${type}&id=${params.id}`
    })
  },

  bannerNavigator(e) {
    const params = e.currentTarget.dataset.param;
    var url = '';
    if (params.relate == 1) {
      url = `../volunteer/activity?id=${params.id}`
    } else {
      url = `./content?type=new&id=${relate_id}`
    }
    wx.navigateTo({
      url: url
    })
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    // if (detail.key == 'tab1') {
    //   this.queryNewList()
    // } else {
    //   this.queryCivilizationList()
    // }
  }
})