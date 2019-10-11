const app =  getApp();

Page({
  onLoad() {
    app.request('/news', 'get', {
      // userid: wx.getStorageSync('userid'),
      id: 1
    }, (res) => {
      if (res.data.code == '0000') {
        console.log(res);
      }
    })
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    current: 'tab1',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
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

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
})