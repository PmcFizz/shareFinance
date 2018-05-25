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
		var infos = wx.getStorageSync('serchData'), qy
		this.setData({money: option.money})
		this.setData({
			search: {
				code:  option.code,
				term:  option.days
			}
		})
		//计算权益金
		qy = (infos.price * option.money * 10000).toFixed(2);
		this.setData({
			quanyi: qy
		})
		//显示数据详情
		this.setData({
			infoData : infos
		})
	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	}
})
