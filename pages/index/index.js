const app = getApp();
Page({
  data: {
    second: 3,
    image:'https://qncdn.playonwechat.com/itest/ad/%E7%BE%8E%E4%B8%BD%E4%B8%AD%E5%9B%BD%E8%A1%8C.jpg',
  },
  onLoad(options) {
    var that = this;
    app.getAuth(function () {
      wx.request({
        url: app.data.apiurl2 + "photo/photo-circle?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        data: {
          type: 'new'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("圈子列表:", res);
          var status = res.data.status;
          if (status == 1) {
            wx.setStorageSync('allList', res.data.data);
            that.setData({
              allList: res.data.data
            })
          } else {
            that.setData({
              allList: false
            })
          }

        }
      })
    })
    console.log("indexoptions：", options);
    var options = options;
    wx.setStorageSync("options", options);
    // 二维码
    if (options.scene) {
      var scenes = options.scene;
      if (options.scene) {
        let scene = decodeURIComponent(options.scene);
        var strs = new Array(); //定义一数组 
        strs = scene.split("_"); //字符分割 
        console.log(strs);
        console.log("pw_id:", strs[3]);
        var type = strs[2];
        var pw_id = strs[3];
        if (pw_id =='undefined'){
            
        }else{
          that.setData({
            pw_id: pw_id,
            type: type
          })
          wx.setStorageSync(pw_id, 'strs[3]')
        }
        
      }
    }else if (options.pw_id) {  //有参
      let pw_id = options.pw_id;
      that.setData({
        pw_id: pw_id
      })
      wx.setStorageSync('pw_id', pw_id);
    }  
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    let time = that.data.time;
    var second = that.data.second;
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements?operator_id=13",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            head_adver
          })

          var inter = setInterval(function () {
            if (second <= 1) {
              clearInterval(inter);
              if (that.data.pw_id){
                if (that.data.type=='h5'){
                  wx.redirectTo({
                    url: '../albumInform/albumInform?pw_id=' + that.data.pw_id+'&ewm=1',
                  })
                } else if(that.data.type=='image'){
                  wx.redirectTo({
                    url: '../templateInform/templateInform?pw_id=' + that.data.pw_id,
                  })
                }
                
              }else{
                wx.switchTab({
                  url: '../square/square',
                })
              }
            }
            second--;
            console.log(second);
            that.setData({
              second,
              inter
            })
          }, 1000)
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      path: '/pages/index/index',
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})
