const app = getApp();
Page({
  data: {
    name: '',
    address: '',
    time: undefined,
    max: undefined,
    desc: undefined,
    category_id: 0,
    categoryList: [],
    team_id: 0,
    teamList: [],
    start_date: '2019-10-22',
    start_time: '10:12',
    end_date: '2019-10-31',
    end_time: '12:11',
  },
  onLoad() {
    this.setData({
      teamList: app.globalData.userInfo.lead_team
    })
    this.queryCategory()
  },
  queryCategory() {
    app.request({
      // url: '/category?module_id=1',
      url: '/category',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            categoryList: data.data.data
          })
        }
      }
    })
  },
  bindCategoryChange(e) {
    this.setData({
      category_id: e.detail.value
    })
  },
  bindTeamChange(e) {
    this.setData({
      team_id: e.detail.value
    })
  },
  bindStartDateChange(e) {
    this.setData({
      start_date: e.detail.value
    })
  },
  bindStartTimeChange(e) {
    this.setData({
      start_time: e.detail.value
    })
  },
  bindEndDateChange(e) {
    this.setData({
      end_date: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    this.setData({
      end_time: e.detail.value
    })
  },
  formSubmit(e) {
    console.log(e.detail.value);
    wx.showModal({
      title: '提示',
      content: '是否确认提交活动？',
      success(res) {
        if (res.confirm) {
          var params = JSON.parse(JSON.stringify(e.detail.value))
          params.town_id = this.data.townList[this.data.town_id].id
          app.request({
            url: '/volunteer',
            method: 'post',
            data: params,
            success: (data) => {
              if (data.code == 1) {
                wx.showToast({
                  title: '提交成功',
                  mask: false
                });
                var timeout = setTimeout(() => {
                  wx.switchTab({
                    url: './volunteer',
                    success: function () {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  });
                  clearTimeout(timeout)
                }, 500);
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})