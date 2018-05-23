var app = getApp()
Page({
	data: {
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
	onLoad: function () {
		this.getSearchResult()
	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	},
	getSearchResult: function () {
		var _self = this
		app.searchPrice({}, function (res) {
			if (res.data.code === 0) {
				_self.setData({infoData: res.data.data})
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
