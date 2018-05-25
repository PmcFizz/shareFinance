//获取应用实例
var app = getApp()
Page({
	data: {
		code: '',
		stockName: '平安金融',
		stockList: [],
		money: '',
		days: '15',
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
		userInfo: {}
	},
	onLoad: function () {
		var that = this
		app.getSearchData({}, function (res) {
			console.log(res.data);
			if(res.data){
				if(res.data.termList.length > 0) {
					var qx = res.data.termList
					that.setData({qixian: qx})
				} else {
					wx.showToast({
						title: '系统出错',
						icon: 'none',
						duration: 2000
					})
				}

			}
		})
	},
	codeInput: function (e) {
		if(e.detail.value.toLowerCase().indexOf('st') > -1) {
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

		if(e.detail.value.length > 2) {
			this.matchStock({
				code: e.detail.value
			})
		}else {
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
		app.getStockName(code, function (res) {
			console.log(res.data.optionList);
			if(res.data) {
				if(res.data.optionList.length > 0) {
					console.log(res.data.optionList[0].optionName)
					_this.setData({
						stockName: res.data.optionList[0].optionName
					})
					_this.setData({
						stockList: res.data.optionList
					})
				}else {
					_this.setData({
						stockName: ''
					})
				}

			}
		})
	},
	tapStocks: function (item) {
		console.log(item)
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
		var _this = this;
		if (!this.data.code) {
			wx.showToast({
				title: '请填写您搜索的股票代码',
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
		if (!this.data.days) {
			wx.showToast({
				title: '请填写您搜索的期限',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		// TODO 验证本金是大于10万的数字
		var sendData = {
			code: this.data.code,
			term: this.data.days
		}
		app.searchPrice(sendData, function (res) {
			if (res.data.code == 200) {
				console.log(res.data.option)
				if(res.data.option) {
					_this.setData({searchData: res.data.option})
					wx.setStorageSync('serchData', res.data.option);
					wx.navigateTo({
						url: '../search_result/search_result?code=' + _this.data.code + "&money=" + _this.data.money + "&days=" + _this.data.days
					})
				}
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
