BusCard.define('/buscardapp/rela/js/getCDMAAdjustInfo.js',function(_buscard,cardParam){ 
	var Me = this;
	var a = arguments[0];
	var b = arguments[1];
	var c = b.serviceRelation.userId;
	var serviceId = b.serviceRelation.serviceId;
	//for compatibility
	var executeRequest = _buscard.executeRequest;

	
	
	Me.productId = b.productId;
	Me.cityCode = b.cityCode;
	Me.getChooseNumber = function () {
		var productId = Me.productId;
		var parameter = "productId=" + productId;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getFixedNumber", parameter);
		var result = "-1";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1") {
				result = jsonResultObj.message;
			}
		}
		catch (e) {
			alert("\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u53d6\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7\u539f\u951f\u65a4\u62f7\u4e3a\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u65a4\u62f7\u951f\u6377\u65a4\u62f7\u951f\u65a4\u62f7\u5931\u951f\u6770\uff4f\u62f7");
			return false;
		}
		if (result == "-1") {
			var B = {"ServiceIdInterface":new ServiceIdInterface({"$" : function(id) {return Me.$(id)}})};
			var container2 = BusCard.$session.container2;
			var workNo = BusCard.$session.workNo;
			var endpassword = BusCard.$session.PASSWORD;
			var noDept = BusCard.$session.acceptDealer;
			var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=1&coopFlag=0";
			Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
		} else {
			var oServiceId = Me.$("serviceId");
			oServiceId.value = result;
			oServiceId.onblur();
			oServiceId.readOnly = true;
		}
	};

	
	//checkGoodNum
	Me.getGoodNumInfo = function (serviceId) {
		var A = serviceId;
		if (!A) {
			Me.hidden("adjustKind");
			Me.hidden("adjustMonths");
			Me.hidden("adjustFee");
			Me.hidden("beforehandFee");
			return true;
		}
		var C = "serviceId=" + A + "&serviceOfferId=" + b.serviceOfferId + "&productId=" + b.productId + "&cityCode=" + b.cityCode;
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getGoodNumInfo", C);
	    var adjustKind=""; 
	    var adjustMonths="";
	    var adjustFee=""; 
	    var beforehandFee=""; 
	    var num=""; 
	       
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj) {
	          adjustKind=jsonResultObj.ADJUST_KIND; 
	          adjustMonths=jsonResultObj.ADJUST_MONTHS; 
	          adjustFee=jsonResultObj.ADJUST_FEE==null?null:jsonResultObj.ADJUST_FEE/100; 
	          beforehandFee=jsonResultObj.BEFOREHAND_FEE==null?null:jsonResultObj.BEFOREHAND_FEE/100;
	          num=jsonResultObj.NUM_RULE_KIND;
	          
	         
	          if(num>0){
	          	Me.display("adjustKind");
	            Me.display("adjustMonths");
	            Me.display("adjustFee");
	            Me.display("beforehandFee");
				Me.$("adjustKind").innerHTML = adjustKind;
				Me.$("adjustMonths").innerHTML = adjustMonths;
				Me.$("adjustFee").innerHTML = adjustFee;
				Me.$("beforehandFee").innerHTML = beforehandFee;
	          }else{
				Me.hidden("adjustKind");
				Me.hidden("adjustMonths");
				Me.hidden("adjustFee");
				Me.hidden("beforehandFee");
		      }
			}
		}catch (e) {
			return false;
		}

	
	};

	Me.initCard = function(){
		var serviceKind=b.serviceRelation.serviceKind;
		var userId=b.serviceRelation.userId;
		var productId=b.productId;
		var belongCode=b.serviceRelation.belongCode; 
		var parameter = "userId=" + c+ "&serviceKind=" + serviceKind+"&productId="+productId+"&belongCode="+belongCode;
		var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getChangeNumInfo", parameter);
//      var note=b.serviceRelation.note;
        var branchNo=b.serviceRelation.branchNo; 
        var addressId=b.serviceRelation.addressId; 
        var addrDetail=b.serviceRelation.addrDetail; 
            
        var count="";
        var serviceId="";
        var productName="";
		try {
			var jsonResultObj = (typeof resultJsonStr == "string") ? eval("(" + resultJsonStr + ")") : resultJsonStr;
			if (jsonResultObj ) {
				productName=jsonResultObj.productName;
	            count=jsonResultObj.count;
	            belongCode=jsonResultObj.belongCode;
	            if(count>0){
	            	if(confirm("\u662f\u5426\u9009\u62e9\u9884\u9009\u53f7\u7801\u4f5c\u4e3a\u65b0\u53f7\u7801")){
	            		serviceId=jsonResultObj.serviceId;
	            	}else{
	            		serviceId="";	            		
	            	}
	            }else{
	            	Me.hidden("adjustKind");
					Me.hidden("adjustMonths");
					Me.hidden("adjustFee");
					Me.hidden("beforehandFee");
	            	serviceId="";
	            }
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
//		if(!note){
//			Me.$("note").innerHTML = "";
//		}else{
//			Me.$("note").innerHTML = note;
//		}

//		Me.$("branchNo").value = branchNo;
//		Me.$("addressId").value = addressId;
//		Me.$("addrDetail").value = addrDetail;
		Me.$("productName").innerHTML = productName;
		Me.$("serviceId").value = serviceId;
		Me.getGoodNumInfo(serviceId);
	};
	Me.initCard();

	Me.$("link_serviceId").onclick = function () {
		Me.getChooseNumber();
	};



	
});