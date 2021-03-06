//app.js

App({
	serverHost: 'https://www.iwin8.cc', // 服务器Host
	onLaunch: function () {
		var _self = this
		this.getSession({}, function (res) {
			_self.globalData.sessionId = res.data.sessionId
		})
	},
	// 全局数据
	globalData: {
		userInfo: null,
		sessionId: '',
		tabbar:{
			color: "#b1b1b1",
			selectedColor: "#fff",
			borderStyle: "black",
			backgroundColor: "#282828",
			list: [{
				pagePath: "/pages/search/search",
				iconPath: "/image/search.png",
				selectedIconPath: "/image/search_A.png",
				text: "询价",
				selected: true,
				showMe: false
			},{
				pagePath: "/pages/contractSearch/contractSearch",
				iconPath: "/image/ctSearch.png",
				selectedIconPath: "/image/ctSearch_A.png",
				text: "合约查询",
				selected: true,
				showMe: false
			},
			{
				pagePath: "/pages/consult/consult",
				iconPath: "/image/consult.png",
				selectedIconPath: "/image/consult_A.png",
				text: "联系我们",
				selected: true,
				showMe: true
			}]
		},
		auth: '' //权限
	},
	// 登录
	login: function (data, cb) {
		var sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/agent/login.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 获取sessionId
	getSession: function (data, cb) {
		wx.request({
			url: this.serverHost + '/module/agent/getSessionId.do',
			data: data,
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 获取搜索条件
	getSearchData: function (data, cb) {
		var sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/dictData/getTerm.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 根据股票代码查询股票名字
	getStockName: function (data, cb) {
		var sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/option/getName.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 查询价格
	searchPrice: function (data, cb) {
		var sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/option/getOption.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 联系我们
	contentUs: function (data, cb) {
		var sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/leaveWord/save.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'POST',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	//合约查询
	getContract: function (data, cb) {
		var  sessionId = this.globalData.sessionId
		wx.request({
			url: this.serverHost + '/module/contract/getContract.do',
			data: data,
			header: {'Cookie': 'JSESSIONID=' + sessionId},
			method: 'POST',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	editTabBar: function() {
		var tabbar = this.globalData.tabbar,
			currentPages = getCurrentPages(),
			_this = currentPages[currentPages.length - 1],
			pagePath = _this.__route__;
		(pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
		for (var i in tabbar.list) {
			tabbar.list[i].selected = false;
			(tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
		}
		_this.setData({
			tabbar: tabbar
		});
	},
	// 获取当前用户信息
	getUserInfo: function (cb) {
		var that = this
		if (this.globalData.userInfo) {
			typeof cb == 'function' && cb(this.globalData.userInfo)
		} else {
			//调用登陆接口
			wx.login({
				success: function (loginRes) {
					// 用户登录后获取code 回传开发服务器 获取openid
					console.log(loginRes)
					wx.getUserInfo({
						success: function (res) {
							that.globalData.userInfo = res.userInfo
							typeof cb == 'function' && cb(that.globalData.userInfo)
						}
					})
				}
			})
		}
	}
})
