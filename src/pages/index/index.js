//index.js
//获取应用实例
var app = getApp()
Page({
	data: {
		userInfo: {},
		account: '',
		pwd: '',
		code: '',
		codePath: ''
	},
	onLoad: function () {
		this.changeCode();
		console.log('+++>登录获取图片')
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
			pwd: e.detail.value
		})
	},
	codeInput: function (e) {
		this.setData({
			code: e.detail.value
		})
	},
	changeCode: function () {
		var imsrc = app.serverHost +'/captcha.jpg?sessionId=' +  app.globalData.sessionId + '&tid' + Math.random() ;
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
		if (!this.data.pwd) {
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
		// TODO 验证手机号 mobile|password|identCode
		var sendData = {
			mobile: this.data.account,
			password: this.data.pwd,
			identCode: this.data.code
		}, _this = this
		app.login(sendData, function (res) {
			if (res.data.code == 200) {
				wx.switchTab({
					url: '../search/search',
				})
			} else {
				console.log(res.data)
				if(res.data.msg == "验证码错误") {
					_this.changeCode();
				}
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 3000
			})
			}
		})
	}
})
