//获取应用实例
var app = getApp()
Page({
	data: {
		code: '',
		stockName: '中国平安',
		money: '',
		days: '30',
		qixian: [
			{'name': '15天', 'value': '15'},
			{'name': '30天', 'value': '30'},
			{'name': '90天', 'value': '90'}],
		benjin: [
			{'name': '10万', 'value': '10'},
			{'name': '20万', 'value': '20'},
			{'name': '30万', 'value': '30'}],
		userInfo: {}
	},
	onLoad: function () {
		var that = this
		app.getSearchData({}, function (res) {
			if (res.data.code === 0) {
				var qx = res.data.data.qixian
				var bj = res.data.data.benjin
				that.setData({qixian: qx})
				that.setData({benjin: bj})
			} else {
				wx.showToast({
					title: res.data.data.message,
					icon: 'none',
					duration: 1000
				})
			}
		})
	},
	codeInput: function (e) {
		this.setData({
			code: e.detail.value
		})

		if (e.detail.value.length == 6) {

		}

	},
	moneyInput: function (e) {
		this.setData({
			money: e.detail.value
		})
	},
	matchStock: function (code) {
		app.getStockName(code, function () {
			if (res.data.code === 0) {
				console.log(res)
			}
		})
	},
	tapHeYue: function (item) {
		console.log(item)
		this.setData({
			days: item.target.dataset.value
		})
	},
	tapBenJin: function (item) {
		this.setData({
			money: item.target.dataset.value
		})
	},
	doSearch: function () {
		var _this = this
		if (!this.data.code) {
			wx.showToast({
				title: '请填写您搜索的股票代码',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.money) {
			wx.showToast({
				title: '请填写您的本金',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.days) {
			wx.showToast({
				title: '请填写您搜索的期限',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		// TODO 验证本金是大于10万的数字
		var sendData = {
			code: this.data.code,
			money: this.data.money,
			days: this.data.days
		}

		wx.navigateTo({
			url: '../search_result/search_result?code=' + _this.data.code + '&money=' + _this.data.money + '&days=' + _this.data.days,
		})
	}
})
