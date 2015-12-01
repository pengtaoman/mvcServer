BusCard.define('/buscardapp/rela/js/getEndDDNMessage.js', function(_buscard,
		cardParam) {
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
//	var w = document.getElementById("serviceCardWidget_0");
	var dl = $("100533");//获取电路类型节点
	function disHid(v) {
		var bd = "\u672c\u5730\u7f51";// 本地网
		var sn = "\u7701\u5185\u7f51";// 省内网
		var sj = "\u7701\u9645\u7f51";// 省际网
		if (bd == v || sn == v) {
			Me.display("addrId")
			Me.display("city");
			Me.display("belongCode");
			Me.display("bureauId");
			Me.display("branchNo");
			Me.hidden("belongProvince");
			Me.hidden("belongCity");
			Me.hidden("addr");
		} else if (sj == v) {
			Me.display("addr");
			Me.display("belongProvince");
			Me.display("belongCity");
			Me.hidden("city");
			Me.hidden("belongCode");
			Me.hidden("bureauId");
			Me.hidden("branchNo");
			Me.hidden("addrId");
		}
	}
	var initCard = function() {
		var v = dl.value
		disHid(v);
	};
	initCard();
	dl.onchange = function() {
		var v = dl.value;
		disHid(v);
	}


});
