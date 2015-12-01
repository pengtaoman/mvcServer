BusCard.define('/buscardapp/rela/js/grtPersonInfo.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.$("grtIdentityCode").onblur = function () {
	Me.grtIdentCodeOnblur();
};	

Me.$("grtIdentityKind").onchange = function () {
	Me.$("grtIdentityCode").select();
	Me.$("grtIdentityCode").focus();
};
Me.grtIdentCodeOnblur = function () {
	if (Me.$("grtIdentityKind").value == "1") {
		if (Me.$("grtIdentityCode").value != "") {
			if (!(Me.$("grtIdentityCode").value.length == 15 || Me.$("grtIdentityCode").value.length == 18)) {
				alert("\u8bc1\u4ef6\u53f7\u7801\u957f\u5ea6\u9519\u8bef");
				Me.$("grtIdentityCode").value = "";
				Me.$("grtIdentityCode").focus();
			}
		}
	}
};
});
