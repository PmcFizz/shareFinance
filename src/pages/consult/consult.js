//获取应用实例
var app = getApp()
Page({
	data: {
		suggest: '',
		email: ''
	},
	onLoad: function () {

	},
	// 保存数据
	saveData: function () {
		if (!this.data.suggest) {
			wx.showToast({
				title: '请填写您的意见',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!this.data.email) {
			wx.showToast({
				title: '请填写手机号或邮箱',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		// TODO 验证手机号或邮箱
		var sendDta = {
			suggest: this.data.suggest,
			email: this.data.email
		}
		app.contentUs(sendDta, function (res) {
			if (res.data.code === 0) {
				wx.showToast({
					title: '您的意见发送！',
					icon: 'success',
					duration: 1000
				})
			} else {
				wx.showToast({
					title: res.message,
					icon: 'none',
					duration: 1000
				})
			}
		})
	},
	suggestInput: function (e) {
		this.setData({
			suggest: e.detail.value
		})
	},
	emailInput: function (e) {
		this.setData({
			email: e.detail.value
		})
	},
	// 清空数据
	resetData: function () {
		this.setData({email: '', suggest: ''})
	}
})
