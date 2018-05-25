var app = getApp()
var util = require('../../utils/util.js')
Page({
	data: {
		infoData: {
			search: {},
			money: '',
			infoData: {},
			quanyi: ''
		}
	},
	onLoad: function (option) {
		var infos = wx.getStorageSync('searchData')
		this.setData({money: option.money})
		//计算权益金
		var qy = (infos.price * option.money * 10000).toFixed(2)
		this.setData({quanyi: qy})
		//格式化日期
		infos.startTime = util.format(new Date(infos.startTime), 'yyyy年MM月dd日')
		infos.endTime = util.format(new Date(infos.endTime), 'yyyy年MM月dd日')
		console.log(infos.startTime)
		//显示数据详情
		this.setData({
			infoData: infos
		})
	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	}
})
