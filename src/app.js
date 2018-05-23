//app.js
App({
	serverHost: 'https://www.easy-mock.com/mock/5b0500231d17152ac64cec6e', // 服务器Host
	onLaunch: function () {
	},
	globalData: {
		userInfo: null
	},
	// 登录
	login: function (data, cb) {
		wx.request({
			url: this.serverHost + '/login',
			data: data,
			method: 'POST',
			success: function (res) {
				if (res.data.code == 0) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 获取搜索条件
	getSearchData: function (data, cb) {
		wx.request({
			url: this.serverHost + '/getsearchData',
			data: data,
			method: 'GET',
			success: function (res) {
				if (res.data.code == 0) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	},
	// 查询价格
	searchPrice: function (data, cb) {
		wx.request({
			url: this.serverHost + '/searchPrice',
			data: data,
			method: 'GET',
			success: function (res) {
				if (res.data.code == 0) {
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
				if (res.data.code == 0) {
					typeof cb == 'function' && cb(res)
				}
			}
		})
	}
})
