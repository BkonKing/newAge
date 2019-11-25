const app = getApp();
Page({
  data: {
    volunteer_status: null,
    name: '',
    idcard: undefined,
    phone: undefined,
    company: undefined,
    address: '',
    town_id: 0,
    team_type_id: 0,
    team_id: 0,
    teamList: [],
    teamTypeList: [{
      id: 4,
      name: '区直机关队伍'
    }, {
      id: 3,
      name: '镇街实践所队伍'
    },  {
      id: 5,
      name: '学校志愿队伍'
    }, {
      id: 2,
      name: '社会组织机构队伍'
    }, {
      id: 1,
      name: '市民群众队伍'
    }],
    teamMulList: [],
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
      }, {
        id: 19,
        name: '其他技能',
      }
    ]
  },
  onLoad() {
    console.log(111)
    this.setData({
      volunteer_status: app.globalData.userInfo.volunteer_status
    })
    this.queryTown()
  },
  formSubmit(e) {
    var params = JSON.parse(JSON.stringify(e.detail.value))
    if (!params.name) {
      wx.showModal({
        content: "请输入姓名",
        showCancel: false,
      })
      return false;
    }
    if (!this.isPhone(params.phone)) {
      return false;
    }
    // if (params.idcard.length != 18) {
    //   wx.showModal({
    //     content: "请输入18位身份号码",
    //     showCancel: false,
    //   })
    //   return false;
    // }
    const teamId = this.data.teamMulList[this.data.team_id].id
    if (!teamId) {
      wx.showModal({
        content: "请选择队伍",
        showCancel: false,
      })
      return false;
    }
    params.town_id = this.data.townList[this.data.town_id].id
    params.team_id = teamId
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
  isPhone: function (value) {
    var isMob = /^((\+?86)|(\(\+86\)))?(1[3456789][0123456789]{9})$/
    if (isMob.test(value)) {
      return true
    }
    wx.showModal({
      content: "请输入正确的手机号",
      showCancel: false,
    })
    return false
  },
  bindPickerChange: function (e) {
    this.setData({
      town_id: e.detail.value
    })
  },
  bindTeamChange(e) {
    this.setData({
      team_id: e.detail.value
    })
  },
  bindTeamTypeChange(e) {
    const value = e.detail.value
    var teamMulList = this.data.teamList[parseInt(this.data.teamTypeList[value].id) - 1]
    this.setData({
      team_type_id: value,
      teamMulList: teamMulList,
      team_id: 0
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
          this.queryTeamList()
        }
      }
    })
  },
  queryTeamList() {
    app.request({
      url: '/team?all=true',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          var arr = [[], [], [], [], []]
          data.data.data.forEach((obj) => {
            if (typeof obj == 'object' && obj) {
              arr[parseInt(obj.type - 1)].push(obj)
            }
          })
          this.setData({
            teamList: arr,
            teamMulList: arr[3]
          })
          this.queryCurrentVolunteer()
        }
      }
    })
  },
  queryCurrentVolunteer() {
    app.request({
      url: '/current/volunteer',
      method: 'get',
      showLoading: true,
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
          if (data.data.team_type != '0') {
            const typeIndex = parseInt(data.data.team_type)
            this.data.teamTypeList.some((obj, index) => {
              if (obj.id == typeIndex) {
                this.setData({
                  team_type_id: index
                })
                return true
              }
            })
            this.data.teamList[typeIndex - 1].some((obj, index) => {
              if (obj.id == data.data.team_id) {
                this.setData({
                  team_id: index,
                  teamMulList: this.data.teamList[typeIndex - 1]
                })
                return true
              }
            })
          }
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
  }
  // checkboxChange(e) {
  //   console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  // }
})