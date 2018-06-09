//获取应用实例
var app = getApp()
Page({
	data: {
		suggest: '',
		email: '',
		tabbar:{}
	},
	onLoad: function () {
		app.editTabBar();
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
		// TODO 验证手机号或邮箱 wordDesc | wordMobile
		var reg = /^1[34578][0-9]{9}$/;
		var reg1 = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		console.log(reg.test(this.data.email), reg1.test(this.data.email))
		if(!reg.test(this.data.email) && !reg1.test(this.data.email)){
			wx.showToast({
				title: '请填写正确的手机号或邮箱',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		var sendDta = {
			wordDesc: this.data.suggest,
			wordMobil: this.data.email
		}
		app.contentUs(sendDta, function (res) {
			console.log(res.data);
			if (res.data.code == 200) {
				wx.showToast({
					title: '您的留言已发送！',
					icon: 'success',
					duration: 3000
				})
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	suggestInput: function (e) {
		var value = e.detail.value, len = parseInt(value.length);
		if (len > 130) return;

		this.setData({
			currentNoteLen: len //当前字数
			//limitNoteLen: this.data.noteMaxLen - len //剩余字数
		});
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
		this.setData({email: '', suggest: '',currentNoteLen: 0})
	}
})
