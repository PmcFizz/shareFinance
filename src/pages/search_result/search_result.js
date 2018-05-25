var app = getApp()
Page({
	data: {
		infoData: {
			search: {},
			money: '',
			infoData: {
			},
			quanyi: ''
		}
	},
	onLoad: function (option) {
		this.setData({money: option.money})
		this.setData({
			search: {
				code:  option.code,
				term:  option.days
			}
		});

		console.log(this.data.search)
		wx.showLoading({
			title: '加载中',
		})
		this.getSearchResult(this.data.search);
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
