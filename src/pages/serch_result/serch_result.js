var app = getApp()
Page({
	data: {
		search: {},
		money: '',
		infoData: {
		},
		quanyi: ''
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
	getSearchResult: function (data) {
		var _self = this, qy;
		app.searchPrice(data, function (res) {
			wx.hideLoading()
			console.log(res.data.code)
			if (res.data.code == 200) {
				_self.setData({infoData: res.data.option})
				qy = (res.data.option.price * _self.money * 10000).toFixed(2)
				_self.setData({
					quanyi: qy
				})
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 3000
				})
			}
		})
	}
})
