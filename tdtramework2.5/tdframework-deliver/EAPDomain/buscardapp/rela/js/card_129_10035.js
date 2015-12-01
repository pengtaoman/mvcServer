BusCard.define('/buscardapp/rela/js/card_129_10035.js',function(_buscard,cardParam){ 

var Me = this;
var a = arguments[0];
var b = arguments[1];
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
var ifIntegrative = Me.$("ifIntegrative");
//for compatibility
var executeRequest = _buscard.executeRequest;
ifIntegrative.disabled = true;

Me.$("deviceNumber").onblur = function(){
	var deviceNumber = Me.$("deviceNumber").value;
	if(deviceNumber == ""){
		return;
	}
	var validInfoObj = {
		"checkSaleMobile" : "1",
		"ifIntegrative"   : "1"
	};
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNumber;
	parameter += "&serviceOfferId="+Me.serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&productId="+Me.productId;
	parameter += "&validJsonInfo="+validJsonInfo;
	var checkJsonStr = executeRequest("prodOfferSaleAjaxAction","getCheckResourceInfo",parameter);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		Me.$("deviceNumber").value = "";
		Me.$("deviceNumber").focus();
		return false;
	}
	
	var queryInfoObj = {
		"MOBILE_SALE_PRICE" : "0",
		"SUGGEST_PRICE" : "0",
		"BELONGS_TO" : "0",
		"MOBILE_SOURCE" : "1",
		"RESOURCE_KIND" : "1",
		"INST_ID" :"-1",
		"CARD_INST_ID":"-1"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNumber;
	parameter += "&serviceOfferId="+Me.serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId="+Me.productId;
	
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			Me.$("deviceResInstId").value = jsonResultObj.INST_ID;
			Me.$("uimResInstId").value = jsonResultObj.CARD_INST_ID;
			if(jsonResultObj.BELONGS_TO==null)
				Me.$("mobileAgent").value = "";
			else
				Me.$("mobileAgent").value = jsonResultObj.BELONGS_TO;
		}else{
			Me.$("deviceNumber").value = "";
			Me.$("deviceNumber").focus();
			return false;
		}
	}catch(e){
		Me.$("deviceNumber").value = "";
		Me.$("deviceNumber").focus();
		return false;
	}
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var cardInit = function(){
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
}; 

cardInit();




});
