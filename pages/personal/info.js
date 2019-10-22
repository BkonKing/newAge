const app = getApp();
Page({
  data: {
    name: '',
    idcard: undefined,
    phone: undefined,
    company: undefined,
    address: '',
    town_id: 0,
    townList: [],
    skillList: [
      {
        id: 1,
        name: '移风易俗',
      }, {
        id: 2,
        name: '助学帮困',
      }, {
        id: 3,
        name: '助医助残',
      }, {
        id: 4,
        name: '精准脱贫',
      }, {
        id: 5,
        name: '邻里守望',
      }, {
        id: 6,
        name: '应急救援',
      }, {
        id: 7,
        name: '助老扶幼',
      }, {
        id: 8,
        name: '文明劝导',
      }, {
        id: 9,
        name: '生态环保',
      }, {
        id: 10,
        name: '文艺惠民',
      }, {
        id: 11,
        name: '文明旅游',
      }, {
        id: 12,
        name: '教育服务',
      }, {
        id: 13,
        name: '心理咨询',
      }, {
        id: 14,
        name: '理论宣讲',
      }, {
        id: 15,
        name: '健身体育',
      }, {
        id: 16,
        name: '科技科普',
      }, {
        id: 17,
        name: '社会宣传',
      }, {
        id: 18,
        name: '法律维权',
      }
    ]
  },
  onLoad() {
    this.queryTown()
  },
  formSubmit(e) {
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
  bindPickerChange: function(e) {
    this.setData({
      town_id: e.detail.value
    })
  },
  queryCurrentVolunteer() {
    app.request({
      url: '/current/volunteer',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          var skillList = this.data.skillList
          data.data.skill.forEach((obj) => {
            skillList[parseInt(obj) - 1].checked = true
          })
          var town_id = 0
          const town = data.data.town_id
          this.data.townList.some((obj, index) => {
            if (obj.id == town) {
              town_id = index
              return true
            }
          })
          this.setData({
            name: data.data.name,
            idcard: data.data.idcard,
            phone: data.data.phone,
            company: data.data.company,
            address: data.data.address,
            town_id: town_id,
            skillList: skillList
          })
        }
      }
    })
  },
  queryTown() {
    app.request({
      url: '/town',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            townList: data.data.data
          })
          this.queryCurrentVolunteer()
        }
      }
    })
  }
  // checkboxChange(e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  // }
})