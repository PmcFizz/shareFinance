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
	onLoad: function (option) {
		this.getSearchResult(option)
	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	},
	getSearchResult: function (option) {
		var _self = this
		app.searchPrice(option, function (res) {
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
