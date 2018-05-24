//app.js
App({
	serverHost: 'https://www.iwin8.cc', // 服务器Host
	onLaunch: function () {
	},
	globalData: {
		userInfo: null
	},
	// 登录
	login: function (data, cb) {
		wx.request({
			url: this.serverHost + '/module/agent/login.do',
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
			method: 'POST',
			success: function (res) {
				if (res.statusCode === 200) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	}
})
