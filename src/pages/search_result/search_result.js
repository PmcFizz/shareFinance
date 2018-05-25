var app = getApp()
var util = require("../../utils/util.js");
Page({
	data: {
		infoData: {
			search: {},
			money: '',
			infoData: {},
			quanyi: '', //权益
			rate: '' //费率
		}
	},
	onLoad: function (option) {
		var infos = wx.getStorageSync('searchData'), qy, rates
		this.setData({money: option.money})
		this.setData({
			search: {
				code: option.code,
				term: option.days
			}
		})
		//计算权益金
		qy = (infos.price * option.money * 10000).toFixed(2)
		rates = (infos.price * 100).toFixed(2);
		this.setData({
			quanyi: qy,
			rate: rates
		})
		//格式化日期
		infos.startTime = util.format(new Date(infos.startTime), "yyyy年MM月dd日")
		infos.endTime = util.format(new Date(infos.endTime), "yyyy年MM月dd日")
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
