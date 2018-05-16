var MusicService = require('../../services/music');

//获取应用实例
var app = getApp()
Page({
    data: {
        slider: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        radioList: [],
        currentView: 1,
        topList: [],
        hotkeys: [],
        showSpecial: false,
        special: { key: '', url: '' },
        searchKey: '',
        searchSongs: [],
        zhida: {},
        showSearchPanel: 1,
        historySearchs: [],
    },
    

    onLoad: function () {
        var that = this;
        MusicService.getRecommendMusic(that.initPageData);
        MusicService.getTopMusic(that.initTopList);
        MusicService.getHotSearchKey(that.initSearchHotKeys);
    },
    initPageData: function (data) {
        var self = this;
        if (data.code == 0) {
            self.setData({
                slider: data.data.slider,
                radioList: data.data.radioList,
            })
        }
    },
    initTopList: function (data) {
        var self = this;
        if (data.code == 0) {
            self.setData({
                topList: data.data.topList
            })
        }
    },
    initSearchHotKeys: function (data) {
        var self = this;
        if (data.code == 0) {
            var special = { key: data.data.special_key, url: data.data.special_url };
            var hotkeys = [];
            if (data.data.hotkey && data.data.hotkey.length) {
                for (var i = 0; (i < data.data.hotkey.length && i < 6); i++) {
                    var item = data.data.hotkey[i];
                    hotkeys.push(item);
                }
            }

            if (special != undefined) {
                self.setData({
                    showSpecial: true
                })
            } else {
                self.setData({
                    showSpecial: false
                })
            }
            self.setData({
                special: special,
                hotkeys: hotkeys
            })
        }
    },
    tabItemTap: function (e) {
        var _dataSet = e.currentTarget.dataset;
        this.setData({
            currentView: _dataSet.view
        });
    },
    radioTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        MusicService.getRadioMusicList(dataSet.id, function (data) {
            console.log(data);
            wx.navigateTo({
                url: '../play/play'
            });
            if (data.code == 0) {
                var list = [];
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    var song = {};
                    var item = dataList[i];
                    song.id = item.id;
                    song.mid = item.mid;
                    song.name = item.name;
                    song.title = item.title;
                    song.subTitle = item.subtitle;
                    song.singer = item.singer;
                    song.album = item.album
                    song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + item.album.mid + '.jpg?max_age=2592000'
                    list.push(song);
                }
                app.setGlobalData({
                    playList: list,
                    playIndex: 0
                });
            }
        });
    },
    hotKeysTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var key = dataSet.key;
        var self = this;
        if (key != '') {
            self.addHistorySearchs(key);
            self.setData({
                searchKey: key,
                showSearchPanel: 3,
            });
            MusicService.getSearchMusic(key, function (data) {
                if (data.code == 0) {
                    var songData = data.data;
                    self.setData({
                        searchSongs: songData.song.list,
                        zhida: songData.zhida
                    });
                }
            });
        }
    },
    topListTap: function (e) {
        var _dataSet = e.currentTarget.dataset;
        app.setGlobalData({
            topListId: _dataSet.id
        });
        wx.navigateTo({
            url: '../toplist/toplist'
        })
    },
    addHistorySearchs: function (key) {
        var historySearchs = this.data.historySearchs;
        if (this.findHistorySearchs(key)) {
            historySearchs.push(key);
            this.setData({
                historySearchs: historySearchs
            })
        }
    },
    findHistorySearchs: function (key) {
        var historySearchs = this.data.historySearchs;
        for (var i = 0; i < historySearchs.length; i++) {
            if (historySearchs[i] == key) { return false; }
        }
        return true;
    },
    bindFocus: function (e) {
        var self = this;
        if (this.data.showSearchPanel == 1) {
            self.setData({
                showSearchPanel: 2
            })
        }
    },
    bindKeyInput: function (e) {
        var self = this;
        self.setData({
            searchKey: e.detail.value
        });
        if (e.detail.value == "") {
            if (this.data.showSearchPanel != 1) {
                self.setData({
                    showSearchPanel: 1
                })
            }
        }
    },
    searchOk: function (e) {
        var self = this;
        var searchKey = this.data.searchKey;
        if (searchKey != "") {
            self.setData({
                showSearchPanel: 3
            });
            self.addHistorySearchs(searchKey);
            MusicService.getSearchMusic(searchKey, function (data) {
                if (data.code == 0) {
                    var songData = data.data;
                    console.log(songData);
                    self.setData({
                        searchSongs: songData.song.list,
                        zhida: songData.zhida
                    });
                }
            });
        }
    },
    historysearchTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var key = dataSet.key;
        var self = this;
        self.setData({
            searchKey: key,
            showSearchPanel: 3
        });
        MusicService.getSearchMusic(key, function (data) {
            if (data.code == 0) {
                var songData = data.data;
                self.setData({
                    searchSongs: songData.song.list,
                    zhida: songData.zhida
                });
            }
        });
    },
    zhidaTap: function (e) {
        var dataSet = e.currentTarget.dataset;
        var mid = dataSet.id;

        app.setGlobalData({ 'zhidaAlbummid': mid });
        wx.navigateTo({
            url: '../cdinfo/cdinfo'
        })

    },
    delHistoryItem: function (e) {
        var historySearchs = this.data.historySearchs;
        var dataSet = e.currentTarget.dataset;
        if (dataSet.index != 'undefined') {
            var _index = parseInt(dataSet.index);
            historySearchs.splice(_index, 1);
            this.setData({
                historySearchs: historySearchs
            });
            if (historySearchs.length == 0) {
                this.setData({
                    showSearchPanel: 1
                })
            }
        }
    },
    clearHistorySearchs: function () {
        this.setData({
            historySearchs: [],
            showSearchPanel: 1
        })
    },
    musuicPlay: function (e) {
        var dataSet = e.currentTarget.dataset;
        var playingSongs = app.globalData.playList;
        if (typeof dataSet.index !== 'undefined') {
            var index = dataSet.index;
            var item = this.data.searchSongs[index];
            console.log(item);
            var song = {};
            var album = {};
            album.mid = item.albummid
            album.id = item.albumid
            album.name = item.albumname;
            album.desc = item.albumdesc

            song.id = item.songid;
            song.mid = item.songmid;
            song.name = item.songname;
            song.title = item.songorig;
            song.subTitle = '';
            song.singer = item.singer;
            song.album = album;
            song.time_public = item.time_public;
            song.img = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + album.mid + '.jpg?max_age=2592000'
            this.addPlayingSongs(song);
        }
    },
    addPlayingSongs: function (song) {
        var playingSongs = app.globalData.playList;
        var index = -1;
        if (typeof playingSongs === 'undefined') {
            playingSongs = [];
            playingSongs.push(song);
            app.setGlobalData({
                playList: playingSongs,
                playIndex: 0
            });
        } else {
            for (var i = 0; i < playingSongs.length; i++) {
                var item = playingSongs[i];
                if (item.mid == song.mid) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                app.setGlobalData({
                    playIndex: index
                });
            } else {
                playingSongs.push(song);
                index = playingSongs.length - 1;
                app.setGlobalData({
                    playList: playingSongs,
                    playIndex: index
                });
            }
        }
        wx.navigateTo({
            url: '../play/play'
        });
    },
    searchSubmit: function (e) {
        console.log(e);

    }
})
