const app = getApp();
const { $Toast } = require('../../iview/base/index');
Page({
  data: {
    info: {},
    teamId: ''
  },
  onLoad(options) {
    this.setData({
      teamId: options.id
    })
    this.queryTeamDetail(options.id)
  },
  queryTeamDetail(id) {
    app.request({ 
      url: '/team/' + id,
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            info: data.data
          })
        }
      }
    })
  },
  callUp: function () {
    wx.makePhoneCall({
      phoneNumber: String(this.data.info.contact_phone)
    })
  },
  apply() {
    app.request({
      url: '/apply',
      method: 'post',
      data: {
        team_id: this.data.teamId
      },
      success: (data) => {
        if (data.code == 1) {
          $Toast({
            // content: '已申请加入，请耐心等待审核',
            content: '已申请加入成功',
            type: 'success'
          })
          this.queryTeamDetail(this.data.teamId)
        } else {
          $Toast({
            content: data.msg,
            type: 'warning'
          })
        }
      }
    })
  }
})