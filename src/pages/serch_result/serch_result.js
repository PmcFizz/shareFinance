//logs.js
var util = require('../../utils/util.js')
Page({
	data: {
		logs: []
	},
	onLoad: function () {

	},
	searchAgin: function () {
		wx.switchTab({
			url: '../search/search'
		})
	}
})
