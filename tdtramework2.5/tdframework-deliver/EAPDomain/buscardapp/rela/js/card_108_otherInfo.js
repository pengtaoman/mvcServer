BusCard.define('/buscardapp/rela/js/card_108_otherInfo.js',function(_buscard,cardParam){ 
    var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var serviceId = b.serviceRelation.serviceId;
	var executeRequest = _buscard.executeRequest;
	Me.productId = b.productId;
   
    Me.initCard = function(){
 		var serviceKind=b.serviceRelation.serviceKind;
		var userId=b.serviceRelation.userId;
		var productId=b.productId;
        var belongCode=b.serviceRelation.belongCode; 
        var note=b.serviceRelation.note;
        var branchNo=b.serviceRelation.branchNo; 
        var addressId=b.serviceRelation.addressId; 
        var addrDetail=b.serviceRelation.addrDetail;
		var parameter = "userId=" + c+ "&serviceKind=" + serviceKind+"&productId="+productId+
		"&branchNo="+branchNo+"&addressId="+addressId+"&addrDetail="+addrDetail+"&belongCode="+belongCode;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getChangeNumInfo", parameter);var cardId = "-1";
        var serviceId="";
        var productName="";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				productName=jsonResultObj.productName;
	            belongCode=jsonResultObj.belongCode; 
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		if(!belongCode){
			Me.$("belongCode").innerHTML="";
		}else{
			Me.$("belongCode").innerHTML = belongCode;
		}
		if(!note){
			Me.$("note").innerHTML = "";
		}else{
			Me.$("note").innerHTML = note;
		}
		Me.$("productName").innerHTML = productName;
		Me.$("serviceId").value = serviceId;
	};
	Me.initCard();
});