var util = require('../../utils/util.js')
var app = getApp()

Page({
    data: {
        // text:"这是一个页面"
        playList: [],
        playIndex: 0,
        showPlayList: true,
        playingMusic: {},
        musicTime: 0,
        currTime: 0,
        musicTimeStr: 0,
        currTimeStr: 0,
        isPlay: false,
        playInv: 0,
        playPro: '',
        playType: 1
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var self = this;
        var list = app.globalData.playList;
        var playingMusic = null;
        if (list.length) {
            var index = app.globalData.playIndex;
            index = (list.length - 1 < index) ? list.length - 1 : index;
            playingMusic = list[index];
            this.setData({
                playList: list,
                playIndex: index,
                playingMusic: playingMusic
            });
        }
        wx.playBackgroundAudio({
            dataUrl: list[index].url,
            title: list[index].title,
            coverImgUrl: list[index].img,
            success: function () {
            },
            fail: function () {
                console.log('播放失败!');
            }
        });


        var inv = setInterval(function () {
            wx.getBackgroundAudioPlayerState({
                success: function (res) {
                    var status = res.status;
                    if (status == 1) {
                        clearInterval(inv);

                        var musicTime = res.duration, currTime = res.currentPosition;
                        var musicTimeStr = (musicTime / 60).toFixed(0) + ':' + ((musicTime % 60).toFixed(0).length < 2 ? '0' + (musicTime % 60).toFixed(0) : (musicTime % 60).toFixed(0));
                        var currTimeStr = (currTime / 60).toFixed(0) + ':' + ((currTime % 60).toFixed(0).length < 2 ? '0' + (currTime % 60).toFixed(0) : (currTime % 60).toFixed(0));
                        var pro = (currTime / musicTime).toFixed(1) + '%';

                        var tempinv = setInterval(function () {
                            var _currTime = self.data.currTime + 1;
                            var _currTimeStr = (_currTime / 60).toFixed(0) + ':' + ((_currTime % 60).toFixed(0).length < 2 ? '0' + (_currTime % 60).toFixed(0) : (_currTime % 60).toFixed(0));
                            var _pro = (_currTime / musicTime * 100).toFixed(1) + '%';

                            self.setData({
                                currTime: _currTime,
                                currTimeStr: _currTimeStr,
                                playInv: tempinv,
                                playPro: _pro
                            })
                        }, 1000);
                        self.setData({
                            currTime: res.currentPosition,
                            musicTime: res.duration,
                            musicTimeStr: musicTimeStr,
                            currTimeStr: currTimeStr,
                            playPro: pro,
                            isPlay: true,
                            playInv: tempinv
                        })

                    }
                },
                fail: function () {

                }
            })
        }, 1000)
    },
    changePlayType: function (e) {
        var dataSet = e.currentTarget.dataset;
        if (dataSet.type == 1) {
            this.setData({
                playType: 2
            });
        }
        if (dataSet.type == 2) {
            this.setData({
                playType: 0
            });
        }
        if (dataSet.type == 0) {
            this.setData({
                playType: 1
            });
        }
    },

    closePlayList: function (e) {
        this.setData({
            showPlayList: true
        })
    },

    showPlayList: function (e) {
        this.setData({
            showPlayList: false
        })
    },
    pauseMusic: function () {
    },
    playNextMusic: function () {
        var self = this;
        var playInv = this.data.playInv;
        var list = this.data.playList;
        var index = this.data.playIndex;
        clearInterval(playInv);
    },
    clearPlayInv: function (inv) {
        var self = this;
        var playInv =  this.data.playInv;

    }
})