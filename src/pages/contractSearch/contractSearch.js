//index.js
//获取应用实例
var app = getApp()
var util = require("../../utils/util.js");
Page({
	data: {
		userInfo: {},
		tabbar:{},
		count: '',
		positionCount: '',
		contractShare: '',
		adminShare: '',
		conList: [],
		getContractTime:'',
		showModal: false,
		modal: '',
		time: true, //时间排序升降
		contract: true, //盈亏排序升降
		prize: true  //价值排序升降
	},
	onLoad: function () {
		app.editTabBar();
		//定时10s获取合约
		this.getData();
		//开启定时器
		this.getContract();
	},
	onShow: function () {
		console.log('页面显示。。');
		if(app.globalData.auth == 2) {
			wx.showToast({
				title: '没有权限',
				icon: 'none',
				mask: true,
				duration: 2000
			})
			setTimeout(function () {

				wx.switchTab({
					url: '../consult/consult'
				})

			}, 2000)
		} else {
			//定时10s获取合约
			this.getData();
			//开启定时器
			this.getContract();
		}
	},
	onHide: function () {
		console.log('页面隐藏了额，切换tab,清除定时器。。。')
		clearTimeout(this.data.getContractTime)
	},
	onUnload: function(){
		console.log('页面卸载,卸载定时器请求。。。')
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
		//查看详情
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
		console.log('关闭弹层了,重启定时器。。')
		this.setData({
			showModal: false
		})
		//开启定时器
		this.getContract();
	},
	sortTime: function (e) {
		//按日期排序
		clearTimeout(this.data.getContractTime)
		if(this.data.conList.length > 0){
			var newList, item;
				if(this.data.time) {
					this.setData({
						time: false
					})
					newList = this.data.conList.sort(util.sortByTime('createDate', false))
				} else {
					this.setData({
						time: true
					})
					newList = this.data.conList.sort(util.sortByTime('createDate', true))
				}

			this.setData({
				conList: newList
			})
		}
	},
	sortResult: function (e) {
		//按价值排序
		clearTimeout(this.data.getContractTime)
		var newList, item ,
			list = this.data.conList
			;
		item = e.currentTarget.dataset.item
		if(this.data.conList.length > 0) {

			if (item == '1') {
				//按总盈亏
				if (this.data.contract) {
					this.setData({
						contract: false
					})

					newList = list.sort(util.sortBy('contractShare', false))
				} else {
					this.setData({
						contract: true
					})
					newList = this.data.conList.sort(util.sortBy('contractShare', true))
				}
					this.setData({
						conList: newList
					})


				} else if (item == '2') {
				//按总价值
				if(this.data.prize) {
					this.setData({
						prize: false
					})
					newList = this.data.conList.sort(util.sortBy('adminShare', false))
				} else {
					this.setData({
						prize: true
					})
					newList = this.data.conList.sort(util.sortBy('adminShare', true))
				}

				this.setData({
					conList: newList
				})

			}

		}

	}
})
