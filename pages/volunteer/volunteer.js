const app =  getApp();

Page({
  onLoad() {
    this.queryActivity()
  },
  data: {
    current: 'tab1',
    activityList: []
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
    if (detail.key == 'tab1') {
      this.queryActivity()
    } else {
      this.queryCurrentActivity()
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