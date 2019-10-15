const { $Toast } = require('../../iview/base/index');

const app = getApp();
Page({
  data: {
    name: '',
    idcard: undefined,
    phone: undefined,
    company: undefined,
    address: ''
  },
  onLoad() {
    this.queryCurrentVolunteer();
  },
  formSubmit(e) {
    app.request({
      url: '/volunteer',
      method: 'post',
      data: e.detail.value,
      success: (data) => {
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },
  queryCurrentVolunteer() {
    app.request({
      url: '/current/volunteer',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            name: data.data.name,
            idcard: data.data.idcard,
            phone: data.data.phone,
            company: data.data.company,
            address: data.data.address
          })
        }
      }
    })
  }
})