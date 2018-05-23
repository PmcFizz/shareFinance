//获取应用实例
var app = getApp()
Page({
	data: {
		code: '',
		money: '',
		days: '30',
		qixian: [
			{'name': '15天', 'value': '15'},
			{'name': '30天', 'value': '30'},
			{'name': '90天', 'value': '90'}],
		benjin: [
			{'name': '10万', 'value': '10'},
			{'name': '20万', 'value': '20'},
			{'name': '30万', 'value': '30'},
			{'name': '100万', 'value': '100'},
			{'name': '50万', 'value': '50'},
			{'name': '300万', 'value': '300'}],
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
	},
	moneyInput: function (e) {
		this.setData({
			money: e.detail.value
		})
	},
	tapHeYue: function (item) {
		this.setData({
			days: item.value
		})
	},
	tapBenJin: function (item) {
		this.setData({
			money: item.value
		})
	},
	doSearch: function () {
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
		app.searchPrice(sendData, function (res) {
			if (res.data.code === 0) {
				wx.showToast({
					title: '查询成功',
					icon: 'success',
					duration: 1000
				})
			} else {
				wx.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 1000
				})
			}
			wx.navigateTo({
				url: '../serch_result/serch_result',
			})
		})
	}
})
