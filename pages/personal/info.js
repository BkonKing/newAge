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
        if (data.code == 1) {
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
            name: data.data.name || '1',
            idcard: data.data.idcard || '1',
            phone: data.data.phone || '1',
            company: data.data.company || '1',
            address: data.data.address || '1'
          })
        }
      }
    })
  }
})