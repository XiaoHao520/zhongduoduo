var t = getApp(), a = t.requirejs("core"), e = (t.requirejs("icons"), t.requirejs("wxParse/wxParse"));
Page({
  data: {
    route: "home",
    icons: t.requirejs("icons"),
    shop: {},
    indicatorDots: !1,
    autoplay: 1,
    interval: 5e3,
    duration: 500,
    circular: !0,
    storeRecommand: [],
    total: 0,
    page: 1,
    loaded: !1,
    loading: !0,
    indicatorDotsHot: !1,
    autoplayHot: !0,
    intervalHot: 5e3,
    durationHOt: 1e3,
    circularHot: !0,
    hotimg: "/static/images/hotdot.jpg",
    notification: "/static/images/notification.png"
  },
  getShop: function () {
    var t = this;
    a.get("shop/get_shopindex", {}, function (a) {
      e.wxParse("wxParseData", "html", a.copyright, t, "5"),
        t.setData({
          shop: a
        })

    })
  },
  onReachBottom: function () {
    this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand()
 
  },
  getRecommand: function () {  //推荐
    var t = this;

 
    t.setData({
      loading: !0
    }),
      a.get("shop/get_recommand", {
        page: t.data.page
      }, function (a) {
           console.log(a);

        var e = {
          loading: !1,
          total: a.total
        };
        t.setData({
          loading: !1,
          total: a.total,
          show: !0
        }),
          a.list || (a.list = []),
          a.list.length > 0 && (t.setData({
            storeRecommand: t.data.storeRecommand.concat(a.list),
            page: a.page + 1
          }), a.list.length < a.pagesize && (e.loaded = !0))
      })
  },
  onLoad: function (a) {
    console.log(a)
    t.url(a)
  },
  onShow: function () {
    var a = t.getCache("sysset");
    wx.setNavigationBarTitle({
      title: a.shopname || "商城首页"
    }),
      this.getShop(),
      this.getRecommand()
  },
  onShareAppMessage: function () {
    return a.onShareAppMessage()
  },
  imagesHeight: function (t) {
    var a = t.detail.width,
      e = t.detail.height,
      o = t.target.dataset.type,
      i = {},
      s = this;
    wx.getSystemInfo({
      success: function (t) {
        i[o] = t.windowWidth / a * e,
          (!s.data[o] || s.data[o] && i[o] < s.data[o]) && s.setData(i)
      }
    })
  }
})
