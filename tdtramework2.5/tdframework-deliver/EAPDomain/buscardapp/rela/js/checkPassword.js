BusCard.define('/buscardapp/rela/js/checkPassword.js',function(_buscard,cardParam){ 
var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.checkPassword = function () {
	var D = window.event;
	if (D) {
		D = D.srcElement;
	}
	if (D && D.value != "" && D.value.length < 6) {
		alert("\u5bc6\u7801\u5fc5\u987b\u662f6\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
		D.value = "";
		D.focus();
		return false;
	}
	
	if(D && D.value){
		jsCommon.checkEasyPassword(D);
	}
	var B = "passwordConfirm";
	if (isValid(D)) {
		B = D.name;
	}
	var A = Me.$("password");
	var C = Me.$("passwordConfirm");
	if (A && C && A.value != "" && C.value != "" && A.value != C.value) {
		alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
		C.value = "";
		C.focus();
		return false;
	}
	return true;
};
Me.checkPassword2 = function () {
	var D = window.event;
	if (D) {
		D = D.srcElement;
	}
//	if (D && D.value != "" && D.value.length < 6) {
//		alert("\u5bc6\u7801\u5fc5\u987b\u662f6\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
//		D.value = "";
//		D.focus();
//		return false;
//	}
	
//	if(D && D.value){
//		jsCommon.checkEasyPassword(D);
//	}
	var B = "passwordConfirm";
	if (isValid(D)) {
		B = D.name;
	}
	var A = Me.$("password");
	var C = Me.$("passwordConfirm");
	if (A && C && A.value != "" && C.value != "" && A.value != C.value) {
		alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
		C.value = "";
		C.focus();
		return false;
	}
	return true;
};
Me.$("password").onblur = function () {
	var serviceId = "";
  	if(!!window.prodOfferAcceptLoader){
  		serviceId = Me.$('serviceId').value||"";
  	}else{
  		serviceId= b.serviceRelation.serviceId;
  	}
  	Me.easyPwdCheck(serviceId);
};
Me.$("passwordConfirm").onblur = function () {
	Me.checkPassword2();
};

Me.easyPwdCheck = function(serviceId){ 
	var pwdObj=Me.$('password');
	if(pwdObj.value!=""){
	    WeakPwdCheck.weakPwdCheck(pwdObj,serviceId);
	    var A = Me.$("password");
		var C = Me.$("passwordConfirm");
		if (A && C && A.value != "" && C.value != "" && A.value != C.value) {
			alert("\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165!");
			C.value = "";
			C.focus();
			return false;
		}
	}
};


});
