//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		userInfo: {},
		account: '',
		phone: '',
		code: '',
		codePath: 'https://www.iwin8.cc/captcha.jpg'
	},
	onLoad: function () {
		app.getUserInfo(function (res) {
			console.log(res)
		})
	},
	nameInput: function (e) {
		this.setData({
			account: e.detail.value
		})
	},
	phoneInput: function (e) {
		this.setData({
			phone: e.detail.value
		})
	},
	codeInput: function (e) {
		this.setData({
			code: e.detail.value
		})
	},
	changeCode: function () {
		var imsrc = 'https://www.iwin8.cc/captcha.jpg?tid=' + Math.random()
		this.setData({
			codePath: imsrc
		})
	},
	login: function () {
		if (!this.data.account) {
			wx.showToast({
				title: '请填写用户名',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.phone) {
			wx.showToast({
				title: '请填写密码',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.code) {
			wx.showToast({
				title: '请填写验证码',
				icon: 'none',
				duration: 1000
			})
			return false
		}

		var sendData = {
			account: this.data.account,
			pwd: this.data.pwd,
			code: this.data.code
		}
		app.login(sendData, function (res) {
			if (res.data.code === 0) {
				wx.switchTab({
					url: '../search/search',
				})
			} else {
				wx.showToast({
					title: res.data.message,
					icon: 'error',
					duration: 1000
				})
			}
		})
	}
})
