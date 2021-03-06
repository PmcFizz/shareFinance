//获取应用实例
var app = getApp()
Page({
	data: {
		code: '',
		stockName: '',
		stockList: [],
		money: '10',
		days: '',
		qixian: [],
		benjin: [
			{'name': '10万', 'value': '10'},
			{'name': '20万', 'value': '20'},
			{'name': '30万', 'value': '30'},
			{'name': '50万', 'value': '50'},
			{'name': '100万', 'value': '100'},
			{'name': '200万', 'value': '200'}
		],
		searchData: {},
		userInfo: {},
		tabbar:{}
	},
	onShow: function () {
		console.log('页面显示');
	},
	onLoad: function () {
		app.editTabBar();
		var that = this;
		app.getSearchData({}, function (res) {
			console.log(res.data)
			if (res.data) {
				if(res.data.code == 1) {
					console.log('未登录。。')
					wx.redirectTo({
						url: '../index/index'
					})
				} else if(res.data.code == 200) {
					if (res.data.termList.length > 0) {
						var qx = res.data.termList
						console.log(res.data.listCode)
						that.setData({qixian: qx,
							days: qx[res.data.listCode]
						})
					} else {
						wx.showToast({
							title: '系统出错',
							icon: 'none',
							duration: 2000
						})
					}
				}else if(res.data.code == "2") {
					//没有权限去到留言界面
					app.globalData.auth = 2
					console.log('没有权限')
					wx.showToast({
						title: '没有权限',
						icon: 'none',
						mask: true,
						duration: 2000
					})
					wx.switchTab({
						url: '../consult/consult'
					})
				}
			}
		})
	},
	codeInput: function (e) {
		if (e.detail.value.toLowerCase().indexOf('st') > -1) {
			wx.showToast({
				title: 'ST开头股票不做报价',
				icon: 'none',
				duration: 2000
			})
			return
		}
		this.setData({
			code: e.detail.value
		})
		if (e.detail.value.length > 2) {
			this.setData({
				stockName: '',
				stockList: []
			})
			this.matchStock({
				code: e.detail.value
			})
		} else {
			this.setData({
				stockName: '',
				stockList: []
			})
		}

	},
	moneyInput: function (e) {
		this.setData({
			money: e.detail.value
		})
	},
	matchStock: function (code) {
		var _this = this
		_this.setData({
			stockName: '',
			stockList: []
		})
		app.getStockName(code, function (res) {
			console.log(res.data.optionList)
			if (res.data) {
				if (res.data.code == 1) {
					console.log('未登录。。')
					wx.redirectTo({
						url: '../index/index'
					})
				} else {
					//比较返回的值, 发送的值与输入的值一致时才渲染结果
					console.log('发送的值'+code.code)
					console.log('当前的输入值' + _this.data.code)
					if(code.code == _this.data.code) {
						if (res.data.optionList.length > 0) {
							console.log(res.data.optionList[0].optionName)
							_this.setData({
								stockName: res.data.optionList[0].optionName
							})
							_this.setData({
								stockList: res.data.optionList
							})
						} else {
							_this.setData({
								stockName: '',
								stockList: []
							})
						}
					} else {
						_this.setData({
							stockName: '',
							stockList: []
						})
					}

				}


			}
		})
	},
	tapStocks: function (item) {
		console.log(item.currentTarget.dataset.stockcode)
		this.setData({
			code: item.currentTarget.dataset.stockcode,
			stockName: item.currentTarget.dataset.stockname,
			days: item.currentTarget.dataset.term,
			stockList: []
		})

	},
	tapHeYue: function (item) {
		console.log(item)
		this.setData({
			days: item.target.dataset.value
		})
	},
	tapBenJin: function (item) {
		this.setData({
			money: item.target.dataset.value
		})
	},
	doSearch: function () {
		var _this = this
		if (!this.data.code) {
			wx.showToast({
				title: '请填写您搜索的股票代码',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.days) {
			wx.showToast({
				title: '请填写您搜索的期限',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.money) {
			wx.showToast({
				title: '请填写您的本金',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		// TODO 验证本金是大于10万的数字
		if (this.data.money && parseInt(this.data.money) < 10) {
			wx.showToast({
				title: '自定义金额10万元起',
				icon: 'none',
				duration: 1000
			})
			return false
		}

		var sendData = {
			code: this.data.code,
			term: this.data.days
		}
		wx.showLoading();
		app.searchPrice(sendData, function (res) {
			wx.hideLoading();
			if (res.data.code == 200) {
				if (res.data.option) {
					_this.setData({searchData: res.data.option})
					wx.setStorageSync('searchData', res.data.option)
					wx.navigateTo({
						url: '../search_result/search_result?code=' + _this.data.code + '&money=' + _this.data.money + '&days=' + _this.data.days
					})
				} else {
					wx.setStorageSync('searchData', '')
					wx.showToast({
						title: '没有查询到数据,请修改参数再试',
						icon: 'none',
						duration: 2000
					})
				}
			} else if(res.data.code == 1) {
				console.log('未登录。。')
				wx.redirectTo({
					url: '../index/index'
				})

			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 2000
				})
			}

		})

	}
})
