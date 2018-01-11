var e = getApp(), r = e.requirejs("core"), t = e.requirejs("wxParse/wxParse");
Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    commission_ok:0.00
  },
  onLoad: function (r) {
    e.url(r),
      "" == e.getCache("userinfo") && wx.redirectTo({
        url: "/pages/message/auth/index"
      })

  },
  getInfo: function () {
    var e = this;
    r.get("member", {}, function (r) {
      0 != r.error ? wx.redirectTo({
        url: "/pages/message/auth/index"
      }) : e.setData({
        member: r,
        show: !0

      }),
        t.wxParse("wxParseData", "html", r.copyright, e, "5")
      console.log(r);
    })
  },
  onShow: function () {
    this.getInfo()

  
    this.getCommission();
  },
  onShareAppMessage: function () {
    return r.onShareAppMessage()
  },
  getCommission: function () {
    var _this=this;
    
    console.log(_this.data);
    r.get("commission/index", {}, function (e) {
          console.log(e.member.commission_ok==null);
        _this.setData({
          commission_ok:e.member.commission_ok
        });
        console.log(_this.data.commission_ok);
      if (7e4 == e.error) {
        
      }
    }
    )
  },
})
