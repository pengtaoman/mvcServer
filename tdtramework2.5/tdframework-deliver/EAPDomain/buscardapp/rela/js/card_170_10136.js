BusCard.define('/buscardapp/rela/js/card_170_10136.js',function(_buscard,cardParam){ 
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
		Me.$("subsidyNo").value = "";
		Me.$("subsidyFee").value = "";
		Me.$("subsidyLeftFee").value = "";
		
		Me.setDisplayNone("payType");
		Me.setDisplayBlock("payType");
	}
};

Me.$("deviceNo").onblur = function(){
	var deviceNo = Me.$("deviceNo").value;
	if(deviceNo == ""){
		return;
	}
	var param = "deviceNo="+deviceNo+"&serviceOfferId="+serviceOfferId;
	
	var checkJsonStr = executeRequest("practicalitySaleAcceptAction","queryDeviceInfo",param);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return false;
	}	
	if(!deviceNoOnblur(deviceNo,true)){
		Me.$("deviceNo").value == "";
		Me.$("deviceNo").focus();
		return false;
	}
	
	if(Me.$("deviceNo").value!='')
	{
		Me.$("realFee").value = "";
		Me.$("realFee").focus();
	}
	/*var currentTable = document.getElementById("deviceSaleInfo");
	if(currentTable)
	{
		var currentRows = currentTable.rows;
		var len = currentRows.length;
		if(len>1)
		{
			var oldMobileNo = currentRows[1].cells[0].innerHTML;
			if(deviceNo!=oldMobileNo)
			{
				alert("换机操作只能换一部设备【"+oldMobileNo+"】");
				Me.$("deviceNo").value = "";
				Me.$("deviceNo").focus();
			}
		}
	}*/
};

Me.$("realFee").onkeypress = function(){
	/*var deviceNo = Me.$("deviceNo").value;
	if(deviceNo=='')
	{
		alert('设备编号不能为空!');
		Me.$("deviceNo").focus();
		return;
	}*/
	return checkInputChar();
};

Me.$("realFee").onblur = function(){
	var realFeeVal = Me.$("realFee").value;
	var preRealFeeVal = Me.$("preRealFee").value;
	if(realFeeVal == ""){
		return;
	}
	var realFee = realFeeVal/1;
	var preRealFee = 0;
	if(preRealFeeVal != "" && !isNaN(preRealFeeVal)){
		preRealFee = preRealFeeVal/1;
	}
	var flag = $("flag").value;
	if(flag=='0')
		Me.$("switchPrice").value = realFee - preRealFee;
	else if(flag=='1')
		Me.$("switchPrice").value = realFee;
	
	var switchPrice = Me.$("switchPrice").value;
	if(switchPrice<=0){
		$("realLeftFee").value = "0";
		$("salePhoneBtnDIV").style.display = 'none';
		var display = Me.$("subsidyNo").parentNode.parentNode.style.display;
		if(display=='' || display=='block')
		{
			Me.setDisplayNone("subsidyNo");
		}
		Me.$("subsidyNo").isNull = '1';
		Me.$("payType").disabled = true;
		Me.$("payInCash").parentNode.style.display = "";
		Me.$("label_payInCash").style.display = "";
		$("salePhoneDIV").style.display=='none';
	}
	else{
		$("realLeftFee").value = switchPrice;
		Me.$("payType").disabled = false;
		$("salePhoneBtnDIV").style.display = 'block';
		$("BReset").style.display = 'none';
		Me.$("payInCash").parentNode.style.display = "";
		Me.$("label_payInCash").style.display = "";
	}
	
	return;
};

Me.setDisplayNone = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "none";
	Me.$("label_" + name).style.display = "none";
};

Me.setDisplayNone2 = function (name) {
	Me.$(name).parentNode.style.display = "none";
	Me.$("label_" + name).style.display = "none";
};

Me.setDisplayBlock = function (name) {
	Me.$(name).parentNode.parentNode.style.display = "";
	Me.$("label_" + name).style.display = "";
};

Me.setDisplayBlock2 = function (name) {
	Me.$(name).parentNode.style.display = "";
	Me.$("label_" + name).style.display = "";
};

Me.setObjDisabled = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var deviceNoOnblur = function(deviceNo,showFlag){
	var parameter = "deviceNo="+deviceNo+"&serviceOfferId="+serviceOfferId;
	var resultJsonStr = executeRequest("practicalitySaleAcceptAction","getDeviceInfo",parameter);
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			Me.$("newoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			if(showFlag == true){
				Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;	
			}
			Me.$("mobileAgent").value = jsonResultObj.BELONGS_TO||"";
			if(Me.$("preRealFee").value == ""){
				Me.$("preRealFee").value = jsonResultObj.MOBILE_SALE_PRICE/100;	
			}					
		}else{
			return false;
		}
	}catch(e){
		return false;
	}
	return true;
}

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}

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

var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("preDeviceNo");
	Me.setObjDisabled("switchPrice");
	Me.setObjDisabled("preRealFee");
	Me.setObjDisabled("subsidyLeftFee");
	Me.setObjDisabled("realLeftFee");
	Me.setObjDisabled("saleDate");
	/* card init */
	if(cardInfo.deviceNo){
		Me.$("preDeviceNo").value = cardInfo.deviceNo;
	}
	if(cardInfo.saleDate){
		Me.$("saleDate").value = cardInfo.saleDate;
	}
	//Me.$("payType").disabled = true;
	Me.setDisplayNone("subsidyNo");
	Me.setDisplayNone2("payInCash");
};

cardInit();
});
