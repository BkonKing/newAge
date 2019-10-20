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
        wx.showToast({
          title: '提交成功',
          mask: false
        });
        var timeout = setTimeout(() => {
          app.getUser().then(() => {
            wx.switchTab({
              url: './personal',
              success: function () {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            });
          })
          clearTimeout(timeout)
        }, 500);
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