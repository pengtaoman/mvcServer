BusCard.define('/buscardapp/rela/js/card_170_10135.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
var constObj = {
	NONE_BIND_SALE_KIND : '0',
	PHONE_ONLY : '1',
	PAY_BY_CASH : '0',
	PAY_BY_SUBSIDY : '1'
};

Me.$("payType").onchange = function(){
	var payTypeVal = Me.$("payType").value;
	if(Me.$("payType")){
		Me.$("payTypeDesc").value = Me.$("payType").options[Me.$("payType").selectedIndex].text;
	}	
	if(payTypeVal == constObj.PAY_BY_CASH){
		Me.$("subsidyNo").isNull = '1';
		Me.setDisplayNone("subsidyNo");
		
		Me.setDisplayNone("payType");
		Me.setDisplayBlock("payType");
	}else{
		Me.$("subsidyNo").isNull = '0';
		Me.setDisplayBlock("subsidyNo");
		
		Me.setDisplayNone("payType");
		Me.setDisplayBlock("payType");
	}
};

Me.$("deviceNo").onblur = function(){
	var deviceNo = Me.$("deviceNo").value;
	if(deviceNo == ""){
		return;
	}
	var validInfoObj = {
		"checkSaleMobile" : "1"
	};
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNo;
	parameter += "&serviceOfferId="+serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&productId=30281";
	parameter += "&validJsonInfo="+validJsonInfo;
	var checkJsonStr = executeRequest("prodOfferSaleAjaxAction","getCheckResourceInfo",parameter);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return false;
	}
	
	var queryInfoObj = {
		"MOBILE_SALE_PRICE" : "0",
		"SUGGEST_PRICE" : "0",
		"BELONGS_TO" : "0",
		"MOBILE_SOURCE" : "1",
		"NEWOLD_STATUS" : "1",
		"RESOURCE_KIND" : "1"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var validJsonInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+deviceNo;
	parameter += "&serviceOfferId="+serviceOfferId;	
	parameter += "&mktResType=4";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId=30281";
	
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			Me.$("newoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			if(jsonResultObj.BELONGS_TO==null)
				Me.$("mobileAgent").value = "";
			else
				Me.$("mobileAgent").value = jsonResultObj.BELONGS_TO;
		}else{
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
			return false;
		}
	}catch(e){
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return false;
	}
	
	if(Me.$("deviceNo").value!='')
	{
		Me.$("realFee").value = "";
		Me.$("realFee").focus();
	}
};

Me.$("realFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realFee").onblur = function(){
	Me.$('realLeftFee').value = Me.$('realFee').value;
};

Me.$("realLeftFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realLeftFee").onblur = function(){
	var dValue = Me.$("realLeftFee").value-Me.$("realFee").value;
	if(dValue>0)
	{
		alert("剩余缴费金额不能大于实收价！");
		Me.$("realLeftFee").value = "";
		Me.$("realLeftFee").select();
	}
};

Me.$("subsidyNo").onblur = function(){
	var subsidyNo = Me.$("subsidyNo").value;
	if(subsidyNo == ""){
		return;
	}
	getSubsidyInfo(subsidyNo);
};


var getSubsidyInfo = function(subsidyNo){
	
	var queryInfoObj = {
		"CARD_VALUE" : "CARD_VALUE"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var parameter = "mktResId="+subsidyNo;
	parameter += "&serviceOfferId=''";	
	parameter += "&mktResType=5";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId=30281";
	var resultJsonStr = executeRequest("goodsSaleAcceptAction","doGetSubsidyInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("subsidyFee").value = jsonResultObj.CARD_VALUE/100;
			Me.$("subsidyLeftFee").value = jsonResultObj.CARD_VALUE/100;
		}else{
			Me.$("subsidyNo").value = "";
			Me.$("subsidyNo").focus();
			alert(jsonResultObj.message);
			return false;
		}
	}catch(e){
		Me.$("subsidyNo").value = "";
		Me.$("subsidyNo").focus();
		alert(e);
		return false;
	}
	return ;
}

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}

Me.setDisplayNone = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "none";
	Me.$("label_" + name).style.display = "none";
};

Me.setDisplayBlock = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "";
	Me.$("label_" + name).style.display = "";
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("subsidyFee");
	Me.setObjDisabled("subsidyLeftFee");
	/* card init */
	Me.$("payType").onchange();
};

cardInit();
});
