function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化日期
function format(date, fmt) {
	var o = {
		"M+" : date.getMonth()+1,                 //月份
		"d+" : date.getDate(),                    //日
		"h+" : date.getHours(),                   //小时
		"m+" : date.getMinutes(),                 //分
		"s+" : date.getSeconds(),                 //秒
		"q+" : Math.floor((date.getMonth()+3)/3), //季度
		"S"  : date.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}

//数组根据属性排序
function sortBy(attr,rev){
	//对结果进行排序，第二个参数没有传递 默认升序排列
	if(rev == undefined){
		rev = 1;
	}else{
		rev = (rev) ? 1 : -1;
	}

	return function(a,b){
		a = parseInt(a[attr]);
		b = parseInt(b[attr]);
		if(a < b){
			return rev * -1;
		}
		if(a > b){
			return rev * 1;
		}
		return 0;
	}
}
//时间排序
function sortByTime(attr,rev){
	//对结果进行排序，第二个参数没有传递 默认升序排列
	if(rev == undefined){
		rev = 1;
	}else{
		rev = (rev) ? 1 : -1;
	}

	return function(a,b){
		a = Date.parse(a[attr]);
		b = Date.parse(b[attr]);
		if(a < b){
			return rev * -1;
		}
		if(a > b){
			return rev * 1;
		}
		return 0;
	}
}
module.exports = {
  formatTime: formatTime,
	format: format,
	sortBy: sortBy,
	sortByTime: sortByTime
}
