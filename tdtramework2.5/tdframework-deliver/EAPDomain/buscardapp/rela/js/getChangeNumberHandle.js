BusCard.define('/buscardapp/rela/js/getChangeNumberHandle.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var serviceId = b.serviceRelation.serviceId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;
	


Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};
Me.checkSameServiceId = function(){
    var cdmaServiceIdElemList = null; 
    try{cdmaServiceIdElemList =ordermgr.accept.compnew._cdma_number_elem_list_; }catch(e){}
    var chooseServiceId = Me.$("serviceId").value;
    if(cdmaServiceIdElemList){
        var len = cdmaServiceIdElemList.length;
        var count = 0;
        while(len--){
            var current = cdmaServiceIdElemList[len].service.value;
            if(current.length>0&&chooseServiceId == current){
                count++;
            }
        }
        if(count>1){
            alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
            Me.$("serviceId").value = "";
            Me.$("resInstId").value = "";
        }
    }
};
Me.existPreSelectPhone = function(){
	var A = Me.$("serviceId").value;	
	var serviceKind=b.serviceRelation.serviceKind;
	var userId=b.serviceRelation.userId;;
	var parameter = "serviceId=" + A+ "&serviceKind=" + serviceKind + "&userId=" + userId;
	
	if (!A) {
		return true;
	}
	var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getPreSelectPhone", parameter);var cardId = "-1";   
    var count="";
    var serviceId="";
	try {
		var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
		if (jsonResultObj ) {
            count=jsonResultObj.count;
            if(count>0){
				alert("\u8be5\u53f7\u7801\u5df2\u7ecf\u88ab\u9884\u5360\uff0c\u4e0d\u5141\u8bb8\u6539\u53f7");
				Me.$("serviceId").value ="";
            }else{

            }
		}
	}catch (e) {
		alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
		return false;
	}
};

Me.serviceOfferId = b.serviceOfferId;

/**
 * 获取交换局id
 */
Me.getSwitchno = function() {
   var switchno="";
   var list=a.$remote("prodInstCommFacadeBO").getProdInstAttrByProperties({prodInstId:b.serviceRelation.userId ,cityCode:b.cityCode,attrId:'60056',stateCd:'109999'});
    if(list&&list.length>0){
      switchno=list[0].attrValue;
    }
   	return switchno;   
}; 
Me.checkResource = function () {
	var E = Me.$("serviceId");
	var A = Me.$("serviceId").value;
	if (!A) {
		return true;
	}
	var serviceParamBO = a.$remote("serviceParamBO");
	//var cdata = serviceParamBO.getBureauId(4, b.serviceRelation.belongCode, b.cityCode);
	var bureauId=BusCard.$remote("commResourceBO").getUpIdByBureauId(b.cityCode,b.serviceRelation.branchNo);
	bureauId=a.parse(bureauId);	
	if(bureauId==""){
		bureauId=b.serviceRelation.branchNo;
	}
	var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode+"&bureauId="+bureauId+"&switchOfficeId=" + Me.getSwitchno();
	var D = executeRequest("prodOfferSaleAjaxAction", "checkResourceDealerInfo", C);
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.$("serviceId").value = "";	
		Me.getGoodNumInfo(A);
		return;
	}		
	//当新号码为虚号码的时候，应该校验不通过
	var parameter=C+"&servcieKind="+b.serviceRelation.serviceKind;
	executeRequest("secondAcceptAjaxAction", "checkPurchaseVirtualNum", parameter);
	var resultArray = B.split("&");
	if(resultArray[2]==-1){
		Me.$("serviceId").value = "";	
		Me.hidden("adjustKind");
		Me.hidden("adjustMonths");
		Me.hidden("adjustFee");
		Me.hidden("beforehandFee");
		alert("虚号码不允许改号");
		return;
	}
	
	//老号码的卡号和新号码是否匹配进行检测
	//1.过去老号码的卡号
	if(b.serviceRelation.serviceKind=="8"){
		var p1="userId=" + c;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getOldCard", p1);
		var cardId="-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				cardId = jsonResultObj.cardId;
			}
		}catch (e) {
			alert("\u83b7\u53d6\u65e7\u5361\u4fe1\u606f\u5931\u8d25");
			return false;
		}
		//2.检测
		var p2 = "uimId=" + cardId + "&serviceOfferId=" +b.serviceOfferId + "&productId=" + b.productId + "&cityCode=" + b.cityCode+"&serviceId="+A;
		executeRequest("prodOfferSaleAjaxAction", "checkIMSI", p2);
	}


	if(resultArray.length==0){
		Me.$("resInstId").value = B;
	}else{
		Me.$("resInstId").value = resultArray[0];
	}
	Me.existPreSelectPhone();
};




Me.$("serviceId").onblur = function () {
	var productId=b.productId;
	if(b.serviceRelation.serviceKind=="8"||b.serviceRelation.serviceKind=="14"||b.serviceRelation.serviceKind=="10"){
		Me.getGoodNumInfo(Me.$("serviceId").value);
		Me.checkResource();
	}
};
Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
}
Me.$("serviceId").onpropertychange = function(){
    Me.checkSameServiceId();
};

Me.initCardInfo = function(){
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
        var productName="";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				productName=jsonResultObj.productName;
			}
		}catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		if(Me.$("belongCode")){
			if(!belongCode){
				Me.$("belongCode").innerHTML="";
			}else{
				Me.$("belongCode").innerHTML = belongCode;
			}
		}
		if(Me.$("note")){
			if(!note){
				Me.$("note").innerHTML = "";
			}else{
				Me.$("note").innerHTML = note;
			}
		}
		if(Me.$("productName")){
			Me.$("productName").innerHTML = productName;
		}
	};
	
	Me.initCardInfo();

});