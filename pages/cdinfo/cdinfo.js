var MusicService = require('../../services/music');
var app = getApp()

Page({
    data: {
        // text:"这是一个页面"
        albumInfo: {},
        coverImg: '',
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var mid = app.globalData.zhidaAlbummid;
        console.log(mid);
        MusicService.getAlbumInfo(mid, this.setPageData)
    },
    setPageData: function (data) {
        if (data.code == 0) {
            var albummid = data.data.mid;
            var img = 'http://y.gtimg.cn/music/photo/mid_album_500/' + albummid.slice(-2, -1) + '/' + albummid.slice(-1) + '/' + albummid + '.jpg'
            this.setData({albumInfo: data.data, coverImg: img});

            this.setListBgColor(data.data.color);

        }
    },
})