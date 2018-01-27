const app = getApp();
const apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    url:'https://friend-guess.playonwechat.com/assets/images/result/40741d60add2279916d8783b3d6667f9.jpg?1513410944?0.5924372259162527',
    page:1,
    type:'new',
    rules:false,
    oldWiner:false,
    music_play: app.data.music_play,
    dataUrl: '',
    finish:true,
    num: Math.random(),
    win:false,
    join:true,
    zanTap1: false,
    gif: 'http://ovhvevt35.bkt.clouddn.com/photo/love.gif?' + Math.random()
  },
  onLoad: function (options) {
    //wx.removeStorageSync('activity')
    console.log('onload');
    let that = this;
    // 活动信息
    
    if (!wx.getStorageSync('sign')){
      app.getAuth(function () {
          wx.request({
            url: app.data.apiurl3 + "photo/activity-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("活动信息:", res);
              var status = res.data.status;
              if (status == 1) {
                that.setData({
                  activeInform: res.data.data,
                  thumb: res.data.data.activity_info.thumb + '?' + that.data.num,
                  join: res.data.data.join,
                  win: res.data.data.win
                })
                wx.setStorageSync('join', res.data.data.join);
                wx.setStorageSync('win', res.data.data.win);
                // 如果缓存win是true,则不弹  未参与活动每次都弹
                if (wx.getStorageSync('win') == true) {
                  // that.setData({
                  //   win: false
                  // })
                }
                wx.hideLoading()
              } else {
                //tips.alert(res.data.msg);
              }
            }
          })
          // music
          wx.request({
            url: app.data.apiurl3 + "photo/get-music?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("music:", res);
              var status = res.data.status;
              if (status == 1) {
                  app.AppMusic.src = res.data.data.url;
                  app.AppMusic.onPlay(() => {
                    console.log('开始播放')
                  })
                  console.log('app.AppMusic')
              
                wx.setStorageSync('dataUrl', res.data.data.url);
                that.setData({
                  dataUrl: res.data.data.url
                })
              } else {
                console.log(res.data.msg);
              }
              wx.hideLoading()
            }
          })
          // 列表
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
                that.setData({
                  allList: res.data.data
                })
              } else {
                // wx.switchTab({
                //   url: '../templatePhoto/templatePhoto' 
                // })
                that.setData({
                  allList: false
                })
                tips.alert(res.data.msg);
              }
              wx.hideLoading()
            }
          })
      })
    }else{
      wx.request({
        url: app.data.apiurl3 + "photo/activity-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("活动信息:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              activeInform: res.data.data,
              thumb: res.data.data.activity_info.thumb + '?' + that.data.num,
              join: res.data.data.join,
              win: res.data.data.win
            })
            wx.setStorageSync('join', res.data.data.join);
            wx.setStorageSync('win', res.data.data.win);
            // 如果缓存win是true,则不弹  未参与活动每次都弹
            if (wx.getStorageSync('win') == true) {
              // that.setData({
              //   win: false
              // })
            }
            wx.hideLoading()
          } else {
            //tips.alert(res.data.msg);
          }
        }
      })
      // music
      wx.request({
        url: app.data.apiurl3 + "photo/get-music?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("music:", res);
          var status = res.data.status;
          if (status == 1) {
            app.AppMusic.src = res.data.data.url;
            app.AppMusic.onPlay(() => {
              console.log('开始播放')
            })
            console.log('app.AppMusic')

            wx.setStorageSync('dataUrl', res.data.data.url);
            that.setData({
              dataUrl: res.data.data.url
            })
          } else {
            console.log(res.data.msg);
          }
          wx.hideLoading()
        }
      })
      // 列表
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
            that.setData({
              allList: res.data.data
            })
          } else {
            // wx.switchTab({
            //   url: '../templatePhoto/templatePhoto' 
            // })
            that.setData({
              allList: false
            })
            tips.alert(res.data.msg);
          }
          wx.hideLoading()
        }
      })
    }
  },
  onReady:function(){
  },
  onShow: function () {
    console.log('onshow')
    let that = this;
    console.log("app.data.music_play",app.data.music_play);
    that.setData({
      music_play: app.data.music_play,
      allList: wx.getStorageSync('allList')
    })
    if (app.data.music_play == true) {
      app.AppMusic.onPlay(() => {
        console.log('开始播放');
        app.data.music_play = true;
        wx.setStorageSync('music_play', true)
        that.setData({
          music_play: true
        })
      })
    }else{
      app.AppMusic.onPause(() => {
        console.log('暂停播放');
        wx.setStorageSync('music_play', false);
        app.data.music_play = false;
        that.setData({
          music_play: false
        })
      })
    }
    console.log(wx.getStorageSync('activity'));
    that.setData({
      show: false,
      type: 'new',
    })
    if (that.data.type =='activity'){
       allList: false
    }
  },
  bindPlay() {
    console.log('bindPlay');
    var that = this;
    let music_play = that.data.music_play;
    if (music_play == true) {
      app.AppMusic.pause();
      app.AppMusic.onPause(() => {
        console.log('暂停播放');
        wx.setStorageSync('music_play', false);
        app.data.music_play = false;
        that.setData({
          music_play: false
        })
      })
    } else {
      app.AppMusic.play();
      app.AppMusic.onPlay(() => {
        console.log('开始播放');
        app.data.music_play = true;
        wx.setStorageSync('music_play', true)
        that.setData({
          music_play: true
        })
      })
    }
    console.log("music_play:",that.data.music_play)
  },
  // 联系客服
  chart() {
    console.log()
    wx.navigateToMiniProgram({
      appId: 'wx22c7c27ae08bb935',
      path: 'pages/photoWall/photoWall?scene=5131fbdd3b9b9c911c7cc0e55417dba5&poster=http://ovhvevt35.bkt.clouddn.com/photo/poster.png&photowall=1',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      }
    })
  },
  newList(e){
    let that = this;
    that.setData({
      type: e.currentTarget.dataset.type,
      page: 1
    })
    console.log(e.currentTarget.dataset.type, 111, that.data.win)
    if (e.currentTarget.dataset.type == 'activity') {
      wx.request({
        url: app.data.apiurl3 + "photo/activity-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("活动信息:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              activeInform: res.data.data,
              thumb: res.data.data.activity_info.thumb + '?' + that.data.num,
              join: res.data.data.join,
              win: res.data.data.win
            })
            wx.setStorageSync('join', res.data.data.join);
            wx.setStorageSync('win', res.data.data.win);
            // 如果缓存win是true,则不弹  未参与活动每次都弹
            if (wx.getStorageSync('win') == true) {
            }
            if (that.data.win == true) {

            } else {
              that.setData({
                join: false
              })
            }
          } else {
            //tips.alert(res.data.msg);
          }
        }
      })
     
    }
    // list
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.data.apiurl2 + "photo/photo-circle?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data:{
        type:e.currentTarget.dataset.type
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
       
        console.log("圈子列表:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            allList: res.data.data,
            type: e.currentTarget.dataset.type
          })
        } else {
          // wx.switchTab({
          //   url: '../templatePhoto/templatePhoto'
          // })
          that.setData({
            allList: false
          })
         // tips.alert(res.data.msg);
        }
        wx.hideLoading();
      }
    })
  },
  // 评论
  pinglunTap(e){
    //console.log(e);
      wx.navigateTo({
        url: '../inform/inform?pw_id=' + e.currentTarget.dataset.pw_id + '&type=' + e.currentTarget.dataset.type + '&name=' + e.currentTarget.dataset.name + '&temp_id=' + e.currentTarget.dataset.temp_id,
      })
  },
  // 详情
  informSquare(e){
    //console.log(e);
    let form_id = e.detail.formId;
    let that = this;
    wx.request({
      url: app.data.apiurl1 + "api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        form_id: form_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
      }
    })
    wx.navigateTo({
      url: '../inform/inform?pw_id=' + e.currentTarget.dataset.pw_id + '&type=' + e.currentTarget.dataset.type + '&name=' + e.currentTarget.dataset.name + '&temp_id=' + e.currentTarget.dataset.temp_id,
    })
  },
  informSquare1(e){
    wx.navigateTo({
      url: '../inform/inform?pw_id=' + e.currentTarget.dataset.pw_id + '&type=' + e.currentTarget.dataset.type + '&name=' + e.currentTarget.dataset.name + '&temp_id=' + e.currentTarget.dataset.temp_id,
    })
  },
  // 点赞
  zanTap(e){
    let that = this;
    let zanIndex = e.currentTarget.dataset.index;
    let object_id = e.currentTarget.dataset.object_id
    let allList = that.data.allList;
    wx.request({
      url: app.data.apiurl2 + "photo/thumb?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data:{
        type: e.currentTarget.dataset.type,
        object_id: e.currentTarget.dataset.object_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("点赞:", res);
        var status = res.data.status;
        if (status == 1) {
          if (res.data.data.flag==true){
            for (let i = 0; i < allList.length; i++) {
              if (i == zanIndex) {
                let thumb_count = parseInt(allList[zanIndex].thumb_count);
                //console.log(typeof (thumb_count));
                allList[zanIndex].thumb_count = thumb_count + 1
              }
            }
            that.setData({
              zanTap1: object_id
            })
            setTimeout(function () {
              that.setData({
                zanTap1: false
              })
            }, 1000)
          }else{
              tips.alert('点过赞了哦！')
          }
          that.setData({
            allList
          })
          
        } else {
          tips.alert(res.data.msg);
        }
        
        
      }
    })
  },
  share(e){
    this.setData({
      shareId: e.currentTarget.dataset.pw_id
    })
  },
  // 关闭弹窗
  activeClose(){
    this.setData({
      join:true
    })
  },
  activeClose1(){
    this.setData({
      win: false
    })
  },
  // 参与活动
  activeIn(e){
     let that = this;
      that.setData({
        join: false
      })
      wx.setStorageSync('cate_id', 13);
      wx.setStorageSync('nowImage', 1);
      wx.setStorageSync('nowTitle', '节日活动');
      wx.navigateTo({
        url: '../moban/moban?cate_id=13&nowTitle=节日活动&nowImage=1',
        success: function (e){
          console.log(e);
          that.setData({
            join: true
          })
        }
      })
  },
    //设置分享
  onShareAppMessage: function (e) {
    console.log(e);
    var that = this;
      return {
        title: '朋友照片墙',
        imageUrl: e.target.dataset.thumb,
        path: '/pages/inform/inform?pw_id=' + e.target.dataset.pw_id + '&type=' + e.target.dataset.type + '&name=' + e.target.dataset.name + '&temp_id=' + e.target.dataset.temp_id,
        success: function (res) {
          console.log(res);
          // 转发成功
        },
        fail: function (res) {
          console.log(res);
          // 转发失败
        }
      }
  },
  // 下拉分页
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉分页")
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    var oldGoodsList = that.data.allList;
    console.log("oldGoodsList:" + oldGoodsList);
    var allList = [];
    var oldPage = that.data.page;
    var reqPage = oldPage + 1;
    console.log(that.data.page);
    wx.request({
      url: app.data.apiurl2 + "photo/photo-circle?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        page: reqPage,
        limit: 20,
        type: that.data.type
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log('新res', res);
        var allList = res.data.data;
        if (res.data.msg==0){
          tips.alert('没有更多数据了')
        }
        if (res.data.data.length == 0 ) 
        tips.alert('没有更多数据了')
        var page = oldPage + 1;
        var newContent = oldGoodsList.concat(allList);

        that.setData({
          allList: newContent,
          page: reqPage
        });
        wx.hideLoading();
        if (newContent == undefined) {
          wx.showToast({
            title: '没有更多数据',
            duration: 800
          })
        }
        console.log("newContent:" + that.data.newContent);

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    });
  },
  // 规则
  newRules1(e){
      wx.navigateTo({
        url: '../rules/rules?thumb=' + this.data.thumb
      })
  },
  // 领红包
  redUrl() {
    wx.navigateToMiniProgram({
      appId: 'wx22c7c27ae08bb935',
      path: 'pages/index/index?scene=5131fbdd3b9b9c911c7cc0e55417dba5',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      }
    })
  },
  shanchu(e){
    console.log(e);
      let that = this;
      let allList = that.data.allList;
      let pw_id = e.currentTarget.dataset.pw_id;
      let photoIndex = e.currentTarget.dataset.index;
      for (let i = 0; i < allList.length;i++){
        if (pw_id == allList[i].pw_id){
          allList.splice(photoIndex, 1);
          wx.setStorageSync('allList', allList);
          that.setData({
            allList
          })
        }
      }
  }
})