BusCard.define('/buscardapp/rela/js/card_171_10138.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
Me.$("cardNo").onblur = function(){
	var cardNo = Me.$("cardNo").value;
	if(cardNo == ""){
		return;
	}
	var cardRecordId = Me.$("cardRecordId").value;
	if(cardRecordId == ""){
		alert("\u3010\u5361\u5fd7\u53f7\u3011\u4e0d\u80fd\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\uff01");
		return;
	}
	var param = "cardNo="+cardNo+"&serviceOfferId="+serviceOfferId+"&cardRecordId="+cardRecordId+"&checkSaleCard=1";
	var checkJsonStr = executeRequest("practicalitySaleAcceptAction","queryCardInfo",param);
	var checkResult = executeAjaxResult(checkJsonStr);
	if (checkResult == false) {
		Me.$("cardNo").value = "";
		Me.$("cardNo").focus();
		return false;
	}
	
	var parameter = "cardNo="+cardNo+"&cardRecordId="+cardRecordId+"&serviceOfferId="+serviceOfferId;
	var resultJsonStr = executeRequest("practicalitySaleAcceptAction","getCardInfo",parameter);
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("resourceKindDesc").value = jsonResultObj.RESOURCE_KIND;
			Me.$("cardValue").value = jsonResultObj.CARD_VALUE/100;
			Me.$("realValue").value = jsonResultObj.CARD_VALUE/100;
			Me.$("validDate").value = jsonResultObj.VALID_DATE;
			Me.$("cardLargessValue").value = jsonResultObj.CARD_LARGESS_VALUE/100;
		}else{
			Me.$("cardNo").value ="";
			Me.$("cardNo").focus();
			return false;
		}
	}catch(e){
		Me.$("cardNo").value ="";
		Me.$("cardNo").focus();
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
	/* set obj readOnly */
	Me.setObjDisabled("resourceKindDesc");
	Me.setObjDisabled("cardValue");
	Me.setObjDisabled("realValue");
	Me.setObjDisabled("cardLargessValue");
	Me.setObjDisabled("validDate");
	Me.$("btn_validDate").disabled = true;
	/* card init */
};

cardInit();


Me.$("grtDeposit").onblur = function(){
	Me.checkGrtDeposit();
};

Me.checkGrtDeposit = function(){
	var grtDeposit = Me.$("grtDeposit").value;
	if(grtDeposit && isNaN(grtDeposit)){
		alert("\u3010\u62c5\u4fdd\u4eba\u62bc\u91d1\u3011\u53ea\u80fd\u4e3a\u6570\u5b57\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");
		Me.$("grtDeposit").value = "";
		Me.$("grtDeposit").focus();
		return false;
	}else if(grtDeposit){
		var standard = /^(\d)+(\.(\d){1,2})?$/;
		if(!standard.test(grtDeposit)){
			alert("\u3010\u62c5\u4fdd\u4eba\u62bc\u91d1\u3011\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01\u6807\u51c6\u683c\u5f0f\u4e3a\uff1a\u975e\u8d1f\u6700\u591a\u4fdd\u7559\u4e24\u4f4d\u5c0f\u6570\u6d6e\u70b9\u578b\u6570\u5b57");
			Me.$("grtDeposit").value = "";
			Me.$("grtDeposit").focus();
			return false;
		}
	}
};
});
