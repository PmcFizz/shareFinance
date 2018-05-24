var app = getApp()
Page({
	data: {
		search: {},
		infoData: {
			name: '',
			code: '',
			benjin: '',
			qixian: '',
			startTime: '',
			endTime: '',
			price: ''
		}
	},
	onLoad: function (option) {
		this.setData({
			search: {
				code:  option.code,
				term:  option.days ,
			}
		});
		console.log(this.search)
		wx.showLoading({
			title: '加载中',
		})
		this.getSearchResult(this.search);
	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	},
	getSearchResult: function (data) {
		var _self = this
		app.searchPrice(data, function (res) {
			wx.hideLoading()
			if (res.data) {
				_self.setData({infoData: res.data})
			} else {
				wx.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 1000
				})
			}
		})
	}
})
