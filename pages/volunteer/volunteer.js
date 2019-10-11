const app =  getApp();

Page({
  onLoad() {
    app.request('/category', 'get', {
      // userid: wx.getStorageSync('userid'),
      // id: 1
    }, (res) => {
      if (res.data.code == '0000') {
        console.log(res);
      }
    })
  },
  data: {
    current: 'tab1',
    activityList: [
      {
        id: '1',
        name: '1',
        time: '1',
        title: '1',
        status: '1',
        newsImage: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
      }
    ]
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

})