// ======================================//
//当前浏览器为IE且版本低于8，提示更新浏览器版本
// ======================================//
(function() {
	if (getCookie("popDiv") == null || getCookie("popDiv") == true) {
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		if (window.ActiveXObject) {
			Sys.ie = ua.match(/msie ([\d.]+)/)[1]
		}
		if (Sys.ie && Sys.ie < 8) {
			var popDiv = "<div id='popDiv' style='background-color:#FFFFFF;font-size:12px;width:950px;height:30px;text-align:center;'>"
					+ "<hr style='margin:-6px 1px 0 1px;;height:5px;border-top:5px solid #F6DC70;'></hr>"
					+ "<div style='float:left; width:910px;height:30px;vartical-align:middle;padding:3px 20px 3px 55px;text-align:center;'>"
					+ "<span>友情提示：您当前使用的浏览器是IE"+Sys.ie+"，为了加快浏览速度，建议您升级到&nbsp;&nbsp;</span>"
					+ "<a href='#' onClick='upgrade(event)'>IE8浏览器</a>。"
					+ "</div>"
					+ "<div style='float:right;text-align:center;width:20px;height:30px;padding:5px 10px 0 0;'>"
					+ "<img src='"
					+ unieap.WEB_APP_NAME
					+ "/unieap/images/cancel1.gif' onClick='closePopDiv()' style='cursor:pointer;'></img>"
					+ "</div>" + "</div>";
			document.write(popDiv);
		}
	}
})();
/**
 * 关闭IE8升级提示
 */
function closePopDiv() {
	document.getElementById("popDiv").style.display = "none";
	setCookie("popDiv", false);
}

// ======================================//
// 关于Cookie的操作
// ======================================//

/**
 * 设置Cookie
 * 
 * @param name
 *            cookie名称
 * @param value
 *            cookie值
 */
function setCookie(name, value) {
	var days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
/**
 * 获取Cookie
 * 
 * @param name
 *            cookie名称
 * @returns cookie值或null
 */
function getCookie(name) {
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null
}
/**
 * 删除Cookie
 * 
 * @param name
 */
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// ======================================//
// 现在并执行升级过程
// ======================================//

/**
 * 封装升级对象
 */
var ie8 = {
	label : "IE8升级程序",
	getInstallPath : function() {
		var url = unieap.WEB_APP_NAME + "/unieap/plugin/";
		url += "IE8-WindowsXP-x86-CHS.exe";
		return url;
	}
}
/**
 * 执行升级方法
 * 
 * @param evt
 */
function upgrade(evt) {
	var pluginForm = document.getElementById("ie8Form");
	if (!pluginForm) {
		pluginForm = document.createElement("form");
		pluginForm.id = "ie8Form";
		pluginForm.method = "post";
		document.body.appendChild(pluginForm);
	}
	pluginForm.action = ie8.getInstallPath();
	pluginForm.submit();
}