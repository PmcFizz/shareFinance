//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		userInfo: {},
		account: '',
		pwd: '',
		code: ''
	},
	onLoad: function () {
		// app.login({account: 1, pwd: 2}, function (res) {
		// 	console.log(res)
		// })
	},
	nameInput: function (e) {
		this.setData({
			account: e.detail.value
		})
	},
	pwdInput: function (e) {
		this.setData({
			pwd: e.detail.value
		})
	},
	codeInput: function (e) {
		this.setData({
			code: e.detail.value
		})
	},
	login: function () {
		if (!this.data.account) {
			wx.showToast({
				title: '请填写用户名',
				icon: 'error',
				duration: 1000
			})
		}
		if (!this.data.pwd) {
			wx.showToast({
				title: '请填写密码',
				icon: 'error',
				duration: 1000
			})
		}
		if (!this.data.code) {
			wx.showToast({
				title: '请填写验证码',
				icon: 'error',
				duration: 1000
			})
		}
		var sendData = {
			account: this.data.account,
			pwd: this.data.pwd,
			code: this.data.code
		}
		app.login(sendData, function (res) {
			if (res.code === 0) {
				wx.switchTab({
					url: '../search/search',
				})
			} else {
				wx.showToast({
					title: res.message,
					icon: 'error',
					duration: 1000
				})
			}
		})
	}
})
