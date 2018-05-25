//app.js
var cookiekey = wx.getStorageSync('cookiekey');
var header = {};
if(cookiekey){
	header.Cookie = cookiekey
}
App({
	serverHost: 'https://www.iwin8.cc', // 服务器Host
	onLaunch: function () {
		this.getSession({},function (res) {
			console.log(res.data);
			if(res.data){
				wx.setStorageSync('cookieKey', res.data.sessionId);//保存Cookie到Storage
			}
		})
	},

	globalData: {
		userInfo: null
	},
	// 登录
	login: function (data, cb) {
		wx.request({
			url: this.serverHost + '/module/agent/login.do',
			data: data,
			header: header,
			method: 'GET',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	getSession: function (data,cb) {
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
		wx.request({
			url: this.serverHost + '/module/dictData/getTerm.do',
			data: data,
			header: header,
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
		wx.request({
			url: this.serverHost + '/module/option/getName.do',
			data: data,
			header: header,
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
		wx.request({
			url: this.serverHost + '/module/option/getOption.do',
			data: data,
			header: header,
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
		wx.request({
			url: this.serverHost + '/contactus',
			data: data,
			header: header,
			method: 'POST',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
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
