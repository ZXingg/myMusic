function getRecommendMusic(callback) {
    //请求所需数据
    var data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
    };
    wx.request({
        //地址
        url: 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        //数据
        data: data,
        //表示返回类型为JSON
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data)
            } else {

            }

        }
    });
}

function getTopMusic(callback) {
    var data = {
        format: 'json',
        g_tk: 5381,
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
    };
    wx.request({
        url: 'http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data)
            } else {

            }
        }
    });
}

function getHotSearchKey(callback) {
    var data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
    };
    wx.request({
        url: 'http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data)
            } else {

            }
        }
    });
}

function getSearchMusic(word, callback) { //word为传入的关键字，callback为回调函数
    var data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: word,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: 1,
        remoteplace: 'txt.mqq.all',
        _: Date.now()
    };
    wx.request({
        url: 'http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data);
            } else {

            }

        }
    });
}

function getTopListInfo(id, callback) {
    var data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top',
        topid: id,
        _: Date.now()
    };
    wx.request({
        url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data);
            } else {

            }

        }
    });
}

function getAlbumInfo(id, callback) {
    var data = {
        albummid: id,
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now()
    };
    wx.request({
        url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            console.log(res);
            if (res.statusCode == 200) {
                callback(res.data);
            } else {
            }
        }
    });
}
function getRadioMusicList(id, callback) {
    var data = {
        labelid: id,
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: Date.now(),
    }
    wx.request({
        url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg',
        data: data,
        header: {
            'Content-Type': 'application/json'
        },
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data);
            } else {

            }

        }
    });
}

module.exports = {
    getRecommendMusic: getRecommendMusic,
    getTopMusic: getTopMusic,
    getHotSearchKey: getHotSearchKey,
    getSearchMusic: getSearchMusic,
    getTopListInfo: getTopListInfo,
    getAlbumInfo: getAlbumInfo,
    getRadioMusicList: getRadioMusicList
}