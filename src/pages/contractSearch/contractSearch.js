//index.js
//获取应用实例
var app = getApp()
var util = require("../../utils/util.js");
Page({
	data: {
		userInfo: {},
		count: '',
		positionCount: '',
		contractShare: '',
		adminShare: '',
		conList: [],
		showModal: false,
		modal: ''
	},
	onLoad: function () {
		var that = this;
		app.getContract({}, function (res) {
			if (res.data.code == 1) {
				wx.redirectTo({
					url: '../index/index'
				})

			} else if(res.data.code == 2){
				//没有权限去到留言界面
				app.globalData.auth = 2
				console.log('没有权限')
				wx.showToast({
					title: '没有权限',
					icon: 'none',
					duration: 2000
				})
				wx.switchTab({
					url: '../consult/consult'
				})
			}else{
				console.log(res.data)
				var conli = res.data.contractList;
				conli = conli.map(function (value) {
					value.createDate = util.format(new Date(value.createDate), "yyyy-MM-dd")
					value.startDate = util.format(new Date(value.startDate), "yyyy-MM-dd")
					value.endDate = util.format(new Date(value.endDate), "yyyy-MM-dd")
					return value
				})
				console.log(conli)
				that.setData({
					count: res.data.count,
					positionCount: res.data.positionCount,
					contractShare: res.data.contractShare,
					adminShare: res.data.adminShare,
					conList: conli
				})

			}
		})
	},
	onShow: function () {
		console.log('页面显示');
		wx.showToast({
			title: '没有权限',
			icon: 'none',
			duration: 2000
		})

		setTimeout(function () {
			if(app.globalData.auth == 2) {
				wx.switchTab({
					url: '../consult/consult'
				})
			};
		}, 2000)

	},
	seeDetail: function (e) {
		console.log(e.currentTarget.dataset)
		//显示弹层
		this.setData({
			showModal: true,
			modal: this.data.conList[e.currentTarget.dataset.index]
		})
		console.log(this.data.modal)
	},
	colseModal: function () {
		console.log('关闭弹层了')
		this.setData({
			showModal: false
		})
	}
})
