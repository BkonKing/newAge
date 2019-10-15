const app = getApp();
Page({
  onLoad() {
    // this.draw('runCanvas', 'runCanvas1', 20, 3000)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    // this.queryCurrentVolunteer();
    this.queryCurrentTeam();
  },
  // 绘制圆形进度条方法
  run(c, w, h) {
    let that = this;
    var num = 1.6 / 100 * c + 0.7;
    if (num > 2) {
      num -= 2
    }
    that.data.ctx2.arc(w, h, w - 5, 0.7 * Math.PI, num * Math.PI); //每个间隔绘制的弧度
    that.data.ctx2.setStrokeStyle("#a68b55");
    that.data.ctx2.setLineWidth("10");
    that.data.ctx2.setLineCap("round");
    that.data.ctx2.stroke();
    that.data.ctx2.beginPath();
    // that.data.ctx2.setFontSize(40); //注意不要加引号
    // that.data.ctx2.setFillStyle("#a68b55");
    // that.data.ctx2.setTextAlign("center");
    // that.data.ctx2.setTextBaseline("middle");
    // that.data.ctx2.fillText(c + "%", w, h);
    that.data.ctx2.draw();
  },
  /**
   * start 起始百分比
   * end 结束百分比
   * w,h 其实就是圆心横纵坐标
   */
  // 动画效果实现
  canvasTap(start, end, time, w, h) {
    var that = this;
    start++;
    if (start > end) {
      return false;
    }
    that.run(start, w, h);
    setTimeout(function () {
      that.canvasTap(start, end, time, w, h);
    }, time);
  },
  /**
   * id----------------canvas画板id
   * percent-----------进度条百分比
   * time--------------画图动画执行的时间  
   */
  draw(id, id2, percent, animTime) {
    var that = this;
    const ctx2 = wx.createCanvasContext(id);
    const ctx3 = wx.createCanvasContext(id2);
    that.setData({
      ctx2: ctx2,
      percentage: percent,
      animTime: animTime
    });
    var time = that.data.animTime / that.data.percentage;
    wx.createSelectorQuery().select('#' + id).boundingClientRect(function (rect) { //监听canvas的宽高
      var w = parseInt(rect.width / 2); //获取canvas宽的的一半
      var h = parseInt(rect.height / 2); //获取canvas高的一半，
      that.canvasTap(0, that.data.percentage, time, w, h)
    }).exec();
    wx.createSelectorQuery().select('#' + id2).boundingClientRect(function (rect) { //监听canvas的宽高
      var w = parseInt(rect.width / 2); //获取canvas宽的的一半
      var h = parseInt(rect.height / 2); //获取canvas高的一半，
      ctx3.arc(w, h, w - 5, 0.7 * Math.PI, 0.3 * Math.PI); //每个间隔绘制的弧度
      ctx3.setStrokeStyle("#3c342f");
      ctx3.setLineWidth("10");
      ctx3.setLineCap("round");
      ctx3.stroke();
      ctx3.beginPath();
      ctx3.draw();
    }).exec();
  },
  data: {
    userInfo: {},
    teamList: [],
    volunteer: {}
  },

  queryCurrentTeam() {
    app.request({
      url: '/current/team',
      method: 'get',
      success: (data) => {
        if (data.code == 1) {
          this.setData({
            teamList: data.data.data
          })
        }
      }
    })
  },

  // queryCurrentVolunteer() {
  //   app.request({
  //     url: '/current/volunteer',
  //     method: 'get',
  //     success: (data) => {
  //       if (data.code == 1) {
  //         this.setData({
  //           volunteer: data.data
  //         })   
  //       }
  //     }
  //   })
  // },

  edit() {
    wx.navigateTo({
      url: './info'
    })
  },

  toActive() {
    wx.switchTab({
      url: '/pages/volunteer/volunteer'
    })
  }
})