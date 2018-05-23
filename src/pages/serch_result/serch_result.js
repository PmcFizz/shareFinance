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
		app.getSearchData({}, function (res) {
			if (res.code === 0) {
				this.setData({infoData: res.data})
			} else {
				wx.showToast({
					title: res.message,
					icon: 'error',
					duration: 1000
				})
			}
		})
	}
})
