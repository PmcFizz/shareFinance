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
		var _self = this
		if(app.globalData.sessionId == '') {
			app.getSession({}, function (res) {
				console.log('in async---?')
				app.globalData.sessionId = res.data.sessionId
				_self.changeCode();
			})
		} else {
			_self.changeCode();
		}
		console.log('+++>登录获取图片')
		// app.getUserInfo(function (res) {
		// 	console.log(res)
		// })
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
		var imsrc = app.serverHost +'/captcha.jpg?sessionId=' +  app.globalData.sessionId + '&tid=' + Math.random() ;
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
				console.log('登录成功')
				if(res.data.role == 0) {
					//没有权限
					console.log('无权限')
					app.globalData.tabbar.list[0].showMe = false;
					app.globalData.tabbar.list[1].showMe = false;
					wx.redirectTo({
						url: '../consult/consult',
					})
					return
				} else if(res.data.role && res.data.option && res.data.contract &&  res.data.role == 1 && res.data.option == 1 && res.data.contract == 1) {
					console.log('有3权限')
					//有询价和查询合约权限
					app.globalData.tabbar.list[0].showMe = true;
					app.globalData.tabbar.list[1].showMe = true;

				} else if (res.data.role && res.data.option && res.data.role == 1 && res.data.option == 1 ){
					console.log('只有查询权限')
					//只有询价权限
					app.globalData.tabbar.list[0].showMe = true;
				}
				wx.redirectTo({
					url: '../search/search',
				})

			} else {
				console.log(res.data)
				if(res.data.msg == "验证码错误") {
					_this.changeCode();
					_this.setData({
						code: ''
					})
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
