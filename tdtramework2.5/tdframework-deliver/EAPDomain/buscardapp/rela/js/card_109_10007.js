BusCard.define('/buscardapp/rela/js/card_109_10007.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var serviceId = b.serviceRelation.serviceId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	Me.initCard = function(){
		var parameter = "userId=" + c;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getCardInfo", parameter);var cardId = "-1";
		var oldcardId = "";
        var oldresId = "";
        var newcardId = ""; 
        var newresId = "";
        var custOrderId ="";
        var acceptPerson ="";
        var acceptDate ="";
        var organName ="";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				oldcardId = jsonResultObj.oldcardId;
				oldresId = jsonResultObj.oldresId;
				newcardId = jsonResultObj.newcardId;
				newresId = jsonResultObj.newresId;
				custOrderId = jsonResultObj.custOrderId;
				acceptPerson = jsonResultObj.acceptPerson;
        		acceptDate = jsonResultObj.acceptDate;
       			organName = jsonResultObj.organName;
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		Me.$("oldCardNum").innerHTML = oldcardId;
		Me.$("newCardNum").innerHTML = newcardId;
		Me.$("custOrderId").innerHTML = custOrderId;
		Me.$("oldUimResInstId").value = oldresId;
		Me.$("newUimResInstId").value = newresId;
		Me.$("serviceId").innerHTML= serviceId;
		Me.$("acceptPerson").innerHTML = acceptPerson;
		Me.$("acceptDate").innerHTML = acceptDate;
		Me.$("organName").innerHTML = organName;
		Me.hidden("oldUimResInstId");  
		Me.hidden("newUimResInstId");  
		Me.hidden("organName");  
	};
	Me.initCard();
});
