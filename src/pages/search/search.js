//获取应用实例
var app = getApp()
Page({
	data: {
		code: '',
		money: '',
		days: '',
		qixian: [],
		benjin: [],
		userInfo: {}
	},
	onLoad: function () {
		app.getSearchData({}, function (res) {
			if (res.code === 0) {
				this.setData({qixian: res.data.qixian})
				this.setData({benjin: res.data.benjin})
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
				icon: 'error',
				duration: 1000
			})
		}
		if (!this.data.money) {
			wx.showToast({
				title: '请填写您的本金',
				icon: 'error',
				duration: 1000
			})
		}
		if (!this.data.days) {
			wx.showToast({
				title: '请填写您搜索的期限',
				icon: 'error',
				duration: 1000
			})
		}
		var sendData = {
			code: this.data.code,
			money: this.data.money,
			days: this.data.days
		}
		app.searchPrice(sendData, function (res) {
			if (res.code === 0) {
				wx.showToast({
					title: '查询成功',
					icon: 'success',
					duration: 1000
				})
			} else {
				wx.showToast({
					title: res.message,
					icon: 'success',
					duration: 1000
				})
			}
			wx.navigateTo({
				url: '../serch_result/serch_result',
			})
		})
	}
})
