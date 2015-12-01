BusCard.define('/buscardapp/rela/js/card_170_10137.js',function(_buscard,cardParam){ 
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
	/*if(payTypeVal == constObj.PAY_BY_CASH){
		Me.$("subsidyNo").isNull = '1';
		Me.setDisplayNone("subsidyNo");
		Me.setDisplayNone("subsidyFee");
	}else{
		Me.$("subsidyNo").isNull = '0';
		Me.setDisplayBlock("subsidyNo");
		Me.setDisplayBlock("subsidyFee");
		if(cardInfo.subsidyNo && cardInfo.subsidyFee){
			Me.$("subsidyNo").value = cardInfo.subsidyNo;
			Me.$("subsidyFee").value = cardInfo.subsidyFee;
		}
	}*/
};

Me.$("backPrice").onkeypress = function(){
	return checkInputChar();
};

Me.$("backPrice").onblur = function(){
	var backPrice = $("backPrice").value;
	var realFee = $("realFee").value;
	if(Number(backPrice)>Number(realFee))
	{
		alert("折旧费不能大于实收价！");
		$("backPrice").value = "";
		$("backPrice").focus();
	}
}

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}

var deviceNoOnblur = function(deviceNo){
	var parameter = "deviceNo="+deviceNo;
	var resultJsonStr = executeRequest("practicalitySaleAcceptAction","getDeviceInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			Me.$("newoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			Me.$("mobileAgent").value = jsonResultObj.BELONGS_TO||"";
			Me.$("realFee").value = jsonResultObj.MOBILE_SALE_PRICE/100;
		}
	}catch(e){
		return false;
	}
};


Me.setDisplayNone = function (name) {
	Me.$(name).parentNode.style.display = "none";
	Me.$("label_" + name).style.display = "none";
};

Me.setDisplayBlock = function (name) {
	Me.$(name).parentNode.style.display = "";
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
	Me.setObjDisabled("deviceNo");
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("realFee");
	Me.setObjDisabled("payInCash");
	/* card init */
	if(cardInfo.deviceNo){
		Me.$("deviceNo").value = cardInfo.deviceNo;
		deviceNoOnblur(cardInfo.deviceNo);
	}
	if(cardInfo.saleDate){
		Me.$("saleDate").value = cardInfo.saleDate;
	}
	Me.$("payType").onchange();
	if(cardInfo.payType){
		Me.$("payType").value = cardInfo.payType;
	}
	Me.$("payType").onchange();
	Me.$("payType").disabled = true;
};

cardInit();
});
