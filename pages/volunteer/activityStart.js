const app = getApp();
var dateTimePicker = require('../../utils/dateTimePicker.js');
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
    start_dateTime: null,
    dateTimeArray: null,
    end_dateTime: null,
    startYear: 2019,
    endYear: 2050,
    orders_id: ''
  },
  onLoad(options) {
    this.setData({
      teamList: app.globalData.userInfo.lead_team
    })
    if (options.orders_id) {
      this.setData({
        orders_id: options.orders_id
      })
    }
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear)
    this.setData({
      // start_dateTime: obj.dateTime,
      // end_dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    })
    this.queryCategory()
  },
  changeStartDateTime(e) {
    this.setData({ start_dateTime: e.detail.value });
  },
  changeEndDateTime(e) {
    this.setData({ end_dateTime: e.detail.value });
  },
  changeStartDateTimeColumn(e) {
    this.changeDateTimeColumn('start_dateTime', 'dateTimeArray', e)
  },
  changeEndDateTimeColumn(e) {
    this.changeDateTimeColumn('end_dateTime', 'dateTimeArray', e)
  },
  changeDateTimeColumn(dateTime, dateTimeArray, e) {
    var arr = this.data[dateTime],
      dateArr = this.data[dateTimeArray]
    arr[e.detail.column] = e.detail.value
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
    this.setData({
      [dateTimeArray]: dateArr,
      [dateTime]: arr
    })
  },
  queryCategory() {
    app.request({
      url: '/category?module=1',
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
  formSubmit(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认提交活动？',
      success: (res) => {
        if (res.confirm) {
          var obj = e.detail.value
          var params = JSON.parse(JSON.stringify(obj))
          const dateArr = this.data.dateTimeArray
          params.category_id = this.data.categoryList[obj.category_id].id
          params.team_id = this.data.teamList[obj.team_id].id
          if (!obj.start_dateTime || !obj.end_dateTime) {
            wx.showToast({
              title: "请选择开始时间和结束时间",
              icon: 'none',
              duration: 1500,
              mask: false
            })
            return
          }
          var start_time = `${dateArr[0][obj.start_dateTime[0]]}-${dateArr[1][obj.start_dateTime[1]]}-${dateArr[2][obj.start_dateTime[2]]} ${dateArr[3][obj.start_dateTime[3]]}:${dateArr[4][obj.start_dateTime[4]]}:${dateArr[5][obj.start_dateTime[5]]}`
          var end_time = `${dateArr[0][obj.end_dateTime[0]]}-${dateArr[1][obj.end_dateTime[1]]}-${dateArr[2][obj.end_dateTime[2]]} ${dateArr[3][obj.end_dateTime[3]]}:${dateArr[4][obj.end_dateTime[4]]}:${dateArr[5][obj.end_dateTime[5]]}`
          if (!this.compareDate(start_time, end_time)) {
            wx.showToast({
              title: "请确保结束时间比开始时间晚",
              icon: 'none',
              duration: 1500,
              mask: false
            })
            return
          }
          params.start_time = start_time
          params.end_time = end_time
          if (this.data.orders_id) {
            params.orders_id = this.data.orders_id
          }
          this.submit(params)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit(params) {
    app.request({
      url: '/activity',
      method: 'post',
      data: params,
      success: (data) => {
        if (data.code == 1) {
          wx.showToast({
            title: '提交成功',
            mask: false
          })
          var timeout = setTimeout(() => {
            wx.switchTab({
              url: './volunteer',
              success: function () {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
            clearTimeout(timeout)
          }, 500)
        }
      }
    })
  },
  compareDate(start, end) {
    var sDate = new Date(start)
    var eDate = new Date(end)
    if(sDate.getTime() > eDate.getTime()){
        return false
    } else {
        return true
    }
  }
})