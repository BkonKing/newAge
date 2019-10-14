const app = getApp();

Page({
  data: {
    current: 'tab1',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    newList: [],
    civilizationList: []
  },

  onLoad() {
    this.queryNewList();
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

  navigator(e) {
    var type = this.data.current == 'tab1' ? 'new' : 'show'
    const params = e.currentTarget.dataset.param
    wx.setStorageSync('newContent', params)
    wx.navigateTo({
      url: './content?type=' + type
    })
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'tab1') {
      this.queryNewList()
    } else {
      this.queryCivilizationList()
    }
  },

  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
})