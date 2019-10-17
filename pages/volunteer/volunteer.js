const app =  getApp();

Page({
  onLoad() {
    this.setData({
      defaultAvatar: app.globalData.defaultAvatar
    })
    this.queryActivity()
  },
  data: {
    current: 'tab2',
    defaultAvatar: '',
    activityList: []
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'tab1') {
      this.queryCurrentActivity()
    } else {
      this.queryActivity()
    }
  },

  queryActivity() {
    app.request({
      url: '/activity',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            activityList: data.data.data
          })   
        }
      }
    })
  },

  queryCurrentActivity() {
    app.request({
      url: '/current/activity',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            activityList: data.data.data
          })   
        }
      }
    })
  }

})