BusCard.define('/buscardapp/rela/js/card_222_20109.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
var c = b.serviceRelation.password;
var pw = Me.$("password");
var pwc = Me.$("passwordConfirm");
Me.initCard = function(){
	if(pw){
		pw.value = c;
	}
	if(pwc){
		pwc.value = c;
	}
	Me.initEvent();
};
Me.initEvent = function(){
	if(pw){
		pw.onblur = function(){
			Me.checkPassword(pw);
		}
	}
	if(pwc){
		pwc.onblur = function(){
			Me.checkPassword(pwc);
		}
	}
};

Me.checkPassword = function(p){
	if (!j(p)) {
		return;
	}
	if(pwc){
		l(pw, pwc);
	}
};
var j = function (p) {
	var s = p.value;
	if (s == "") {
		alert("\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01");
		p.focus();
		return false;
	}
	var m = s.charAt(0);
	var n = parseInt(m);
	var a = parseInt(m);
	var t = m;
	var r = m;
	var q = n + "" + n + "" + n + "" + n + "" + n + "" + n;
	for (var o = 0; o < 5; o++) {
		if (n != 9) {
			n = n + 1;
			t = t + "" + n;
		}
		if (a != 0) {
			a = a - 1;
			r = r + "" + a;
		}
	}
	if (s == q || s == t || s == r) {
		alert("\u60a8\u7684\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355\uff0c\u8bf7\u91cd\u65b0\u8bbe\u7f6e6\u4f4d\u4e0d\u89c4\u5219\u5bc6\u7801!\n\u7b80\u5355\u5bc6\u7801\u6307\uff1a6\u4f4d\u5bc6\u7801\u4e00\u6837\uff0c6\u4f4d\u5bc6\u7801\u9012\u589e\uff0c6\u4f4d\u5bc6\u7801\u9012\u51cf\uff0c\u5982'111111,123456,654321'!");
		p.value = "";
		p.focus();
		return false;
	}
	return true;
};
var l = function (a, m) {
	var b = window.event;
	if (b) {
		b = b.srcElement;
	}
	if (b && b.value != "" && b.value.length < 6) {
		alert("\u5bc6\u7801\u5fc5\u987b\u662f6\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
		b.value = "";
		b.focus();
		return false;
	}
	if(b && b.value){
		jsCommon.checkEasyPassword(b);
	}
	if (a && m && a.value != "" && m.value != "" && a.value != m.value) {
		alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
		m.value = "";
		m.focus();
		return false;
	}
	return true;
};
Me.initCard();
});
