BusCard.define('/buscardapp/rela/js/card_170_10235.js',function(_buscard,cardParam){ 
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

var list1 = [],list2 = [];
list1.push({id : 0,name : '绉熸満'});
list1.push({id : 2,name : '鍞満'});
list2.push({id : 1,name : '瑁告満'});

//
BusCard.$rs(Me.$("saleType"),list2);
//
Me.$("bindServiceId").style.display = "none";
Me.$("label_bindServiceId").style.display = "none";
Me.$("bindServiceId").isNull = '1';

Me.$("saleKind").onchange = function(){
	if(Me.$("saleKind").value=='0'){//
		BusCard.$rs(Me.$("saleType"),list2);
		
		Me.$("bindServiceId").style.display = "none";
		Me.$("label_bindServiceId").style.display = "none";
		Me.$("bindServiceId").setAttribute("isnull","1");
		$("custInfoDIV").style.display = "none";
	}else{
		BusCard.$rs(Me.$("saleType"),list1);
		
		Me.$("bindServiceId").style.display = "";
		Me.$("label_bindServiceId").style.display = "";
		Me.$("bindServiceId").setAttribute("isnull","0");
		$("custInfoDIV").style.display = "";
	}
};

Me.$("bindServiceId").onblur = function(){
	var bindServiceId = Me.$("bindServiceId").value;
	if(bindServiceId=='')
		return;
	var param = "&serviceId="+bindServiceId+"&mobileAgent="+$("mobile_Agent_Id").value+"&deviceNo="+$("deviceNo").value+"&payType="+$("payType").value;
	var resultStr = executeRequest("goodsSaleAcceptAction","doCheckBindServiceId",param);
	var resultObj = Jscu.util.CommUtil.parse(resultStr);
	if(resultObj.flag=='0'){
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410017',infoList:[resultObj.result]});
		Me.$("bindServiceId").value = "";
		Me.$("bindServiceId").focus();
		return;
	}
	$("custInfoDIV").style.display = "";
	$("custName").value = resultObj.custName;
	$("custKind").value = resultObj.custKind;
	$("identityKind").value = resultObj.identityKind;
	$("identityCode").value = resultObj.identityCode;
	$("userId").value = resultObj.userId;
};

/*Me.$("extentInfo").onchange = function(){
	var extentInfo = Me.$("extentInfo").value;
	var param = "extentInfo="+extentInfo;
	var jsonMapStr = executeRequest("businessAcceptAction","getRetailInfo",param);
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	BusCard.$rs($("retailInfo"),jsonMapObj.retailInfoColl);
};*/

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
		
		var optionObj = $("batchFlag").options;
		if(optionObj.length != 0){
			$("batchFlag").options.innerHTML = "";
			Me.initBatchFlag();
		}
		
		if(Me.$("bindServiceId")){//
			Me.$("bindServiceId").fireEvent("onblur"); 
		}
		
	}else{
		Me.$("subsidyNo").isNull = '0';
		Me.setDisplayBlock("subsidyNo");
		//
		setTimeout(function(){
			Me.setDisplayNone("payType");
			Me.setDisplayBlock("payType");
		},100);
	}
};

Me.$("batchFlag").onchange = function(){
	var batchFlag = Me.$("batchFlag").value;
	if(batchFlag=='1'){
		$("batchButtonDiv").style.display = "";
		$("batchDIV").style.display = "";
		$("formButtonDiv").style.display = "none";
		$("batchExpBtnTD").style.display = "block";
		
		$("batchCommitBtn").disabled = true;
	}else{
		$("batchButtonDiv").style.display = "none";
		$("batchDIV").style.display = "none";
		$("formButtonDiv").style.display = "";
	}
};

Me.$("realFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realFee").onblur = function(){
	var subsidyFee = Me.$('subsidyFee').value||'';
	if(subsidyFee=='')
		Me.$('realLeftFee').value = Me.$('realFee').value;
	else{
		var switchPrice = Me.$("realFee").value - Me.$('realFee').value;
		Me.$('realLeftFee').value = switchPrice>=0?switchPrice:0;
	}
};

Me.$("realLeftFee").onkeypress = function(){
	return checkInputChar();
};

Me.$("realLeftFee").onblur = function(){
	var dValue = Me.$("realLeftFee").value-Me.$("realFee").value;
	if(dValue>0)
	{
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410198'});
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
			Me.$("realLeftFee").value = Me.$("realFee").value - jsonResultObj.CARD_VALUE/100;
		}else{
			Me.$("subsidyNo").value = "";
			Me.$("subsidyNo").focus();
			orderaccept.common.dialog.MessageBox.alert({busiCode:'08410017',infoList:[jsonResultObj.message]});
			return false;
		}
	}catch(e){
		Me.$("subsidyNo").value = "";
		Me.$("subsidyNo").focus();
		orderaccept.common.dialog.MessageBox.alert({busiCode:'08410017',infoList:[e]});
		return false;
	}
	/*
	var realLeftFee = Me.$('realLeftFee').value||'';
	if(realLeftFee=='')
		Me.$('realLeftFee').value = '';
	else{
		var switchPrice = Me.$("realFee").value - Me.$('realFee').value;
		Me.$('realLeftFee').value = switchPrice>=0?switchPrice:0;
	}
	*/
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

Me.initBatchFlag = function(){
	var options = $("batchFlag").options;
	var op1 = document.createElement("option");
	op1.value = 0;
	op1.text = '\u5426';
	options.add(op1);
	
	var op2 = document.createElement("option");
	op2.value = 1;
	op2.text = '\u662f';
	options.add(op2);
};

var cardInit = function(){
	/* set obj readOnly */
	Me.setObjDisabled("moblieSourse");
	Me.setObjDisabled("newoldStatus");
	Me.setObjDisabled("resourceKind");
	Me.setObjDisabled("shouldFee");
	Me.setObjDisabled("mobileAgent");
	Me.setObjDisabled("subsidyFee");
	/* card init */

	//add by liuzhenyang
	   var special =$("specialFlag").value;
	    if(special==1){
	    	Me.setObjDisabled("realFee");//判断是否是特殊终端 特殊终端不允许改实收价
	        }
	Me.$("payType").onchange();
	
	Me.initBatchFlag();
};

cardInit();
});
