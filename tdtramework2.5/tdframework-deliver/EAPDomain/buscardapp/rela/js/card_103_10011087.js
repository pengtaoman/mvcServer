BusCard.define('/buscardapp/rela/js/card_103_10011087.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var e = b.productId;
	var f = b.serviceOfferId;
	var executeRequest = _buscard.executeRequest;
	Me.getTypeNum = function () {
		var parameter = "userId=" + c;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getTypeNum", parameter);

		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				hardwareType = jsonResultObj.hardwareType;
				hardwareId = jsonResultObj.hardwareId
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		Me.$("terminalEquipmentType").innerHTML = hardwareType;
		Me.$("terminalEquipmentNum").innerHTML = hardwareId;
		
	};
	Me.getTypeNum();
	
	

});
