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
		getContractTime:'',
		showModal: false,
		modal: ''
	},
	onLoad: function () {
		//定时10s获取合约
		this.getData();
		//开启定时器
		this.getContract();
	},
	onShow: function () {
		console.log('页面显示');
		if(app.globalData.auth == 2) {
			wx.showToast({
				title: '没有权限',
				icon: 'none',
				duration: 2000
			})
			setTimeout(function () {

				wx.switchTab({
					url: '../consult/consult'
				})

			}, 2000)
		}
	},
	onUnload: function(){
		console.log('页面隐藏,卸载定时器请求。。。')
		clearTimeout(this.data.getContractTime)
	},
	getContract: function(){
		var that = this;
		this.setData({
			getContractTime: setTimeout(function () {

				that.getData();
				that.getContract();
			}, 10000)
		})
	},
	getData: function () {
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
	seeDetail: function (e) {
		console.log(e.currentTarget.dataset)
		//关闭定时器
		console.log('清除定时器'+ this.data.getContractTime)
		clearTimeout(this.data.getContractTime)
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
		//开启定时器
		this.getContract();
	}
})
