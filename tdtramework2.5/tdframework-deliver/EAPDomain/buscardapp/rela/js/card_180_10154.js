BusCard.define('/buscardapp/rela/js/card_180_10154.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var mktResCd = cardInfo.serviceOfferId/-1;
//for compatibility
var executeRequest = _buscard.executeRequest;
var constObj = {
	DEFAULT_SERVICE_OFFER_ID : '4001'
};

Me.$("deviceNo").onblur = function(){
	var deviceNo = Me.$("deviceNo").value;
	if(deviceNo == ""){
		return;
	}
	var queryInfoObj = {
		"INST_ID" : "0",
		"MOBILE_SOURCE" : "1"
	};
	var validInfoObj = {
		"checkSaleMobile" : "1"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNo;
	parameter += "&serviceOfferId="+constObj.DEFAULT_SERVICE_OFFER_ID;
	parameter += "&mktResType=4";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId=''";
	parameter += "&validJsonInfo="+validJsonInfo;
	parameter += "&cityCode="+cardInfo.cityCode;
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getResListInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("mktResInstId").value = jsonResultObj.INST_ID;
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
		}else{
			alert(jsonResultObj.message);
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
			return false;
		}
	}catch(e){
		alert(e);
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return false;
	}
};

Me.setObjReadOnly = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var cardInit = function(){
	Me.setObjReadOnly("moblieSourse");
};

cardInit();
});
