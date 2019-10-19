const app = getApp();
Page({
  data: {
    name: '',
    desc: undefined,
    contact_name: undefined,
    contact_phone: undefined,
    address: ''
  },
  onLoad() {
  },
  formSubmit(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认提交点单？',
      success (res) {
        if (res.confirm) {
          app.request({
            url: '/orders',
            method: 'post',
            data: e.detail.value,
            success: (data) => {
              wx.showToast({
                title: '提交成功',
                mask: false
              });
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                });
              }, 500);
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})