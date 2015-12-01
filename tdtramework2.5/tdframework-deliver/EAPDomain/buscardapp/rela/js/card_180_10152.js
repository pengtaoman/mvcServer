BusCard.define('/buscardapp/rela/js/card_180_10152.js',function(_buscard,cardParam){ 
var Me = this;
var cardInfo = arguments[1];
//var couponsInfo = $("couponsInfo");
//for compatibility
var executeRequest = _buscard.executeRequest;
//BusCard.Namespace.create("ordermgr.accept.compnew");
//ordermgr.accept.compnew._coupon_no_list_ = ordermgr.accept.compnew._coupon_no_list_ || [];
var validMonths = cardInfo.validMonths;//有效时长(月)
var constObj = {
	DEFAULT_SERVICE_OFFER_ID : '4001'
};

Me.$("giftNo").onblur = function(){
	var giftNo = Me.$("giftNo").value;
	var verifyNo = Me.$("verifyNo").value;
	if(giftNo == ""){
		return;
	}
	if(!checkIfTerminalCouponBind()){
		return;
	}
	if(verifyNo == ""){
		Me.$("verifyNo").focus();
		return;
	}
	getGiftInfo(giftNo,verifyNo);
};

Me.$("verifyNo").onblur = function(){
	var giftNo = Me.$("giftNo").value;
	var verifyNo = Me.$("verifyNo").value;
	if(verifyNo == ""){
		return;
	}
	if(giftNo == ""){
		Me.$("giftNo").focus();
		return;
	}
	getGiftInfo(giftNo,verifyNo);
};

var checkIfTerminalCouponBind = function(){
	//终端串号与礼券编号绑定关系判断
	if(Me.$("deviceNo") && Me.$("deviceNo").value){//已输入手机串号
		var param = "giftNo="+Me.$("giftNo").value+"&deviceNo="+Me.$("deviceNo").value;
		var result = executeRequest("prodOfferSaleAjaxAction","checkIfTerminalCouponBind",param);
		if(result){
			var retObj = eval("("+ result +")");
			if(retObj.FLAG == 0){//检测失败
				alert("\u8f93\u5165\u793c\u5238\u7f16\u53f7\u4e0e\u7ec8\u7aef\u7f16\u53f7\u6ca1\u6709\u7ed1\u5b9a\u5173\u7cfb\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
				//清空礼券相关资源数据
				Me.$("giftNo").value = "";
				Me.$("giftNo").focus();
				return false;
			}
		}
	}
	return true;
}

/**
 * 获取礼券信息
 */
var getGiftInfo = function(giftNo,verifyNo){
	var queryInfoObj = {
		"CARD_VALUE" : "0",
		"VALID_DATE" : "0",
		"INST_ID" : "0"
	};
	
	var validInfoObj = {
		"checkStatus" : "1"
	};
	var queryInfo = BusCard.util.toJson(queryInfoObj);
	var validInfo = BusCard.util.toJson(validInfoObj);
	var parameter = "mktResId="+giftNo;
	parameter += "&serviceOfferId="+constObj.DEFAULT_SERVICE_OFFER_ID;
	parameter += "&mktResType=7";
	parameter += "&queryJsonInfo="+queryInfo;
	parameter += "&productId=''";
	parameter += "&validJsonInfo="+validInfo;
	parameter += "&cityCode="+cardInfo.cityCode;
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getResListInfo",parameter);
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			Me.$("advancedPayment").value = jsonResultObj.CARD_VALUE/100;
			if(jsonResultObj.VALID_DATE && jsonResultObj.VALID_DATE != 'null'){
				Me.$("advancedEffDate").value = jsonResultObj.VALID_DATE;
			}else{
				Me.$("advancedEffDate").value = "";
			}
			//couponsInfo.value = giftNo + "~" + Me.$("advancedPayment").value + "~" + Me.$("advancedEffDate").value;
//			var checkedCouponObj = {
//				"couponNO" : giftNo,
//				"mktResInstId" : jsonResultObj.INST_ID,
//				"payMent" : jsonResultObj.COUPON_VALUE/100
//			};
//			ordermgr.accept.compnew._coupon_no_list_.push(checkedCouponObj);
			Me.$("mktGiftResInstId").value = jsonResultObj.INST_ID;
		}else{
			alert(jsonResultObj.message);
			Me.$("giftNo").value = "";
			Me.$("verifyNo").value = "";
			Me.$("giftNo").focus();
			return false;
		}
	}catch(e){
		alert(e);
		Me.$("giftNo").value = "";
		Me.$("verifyNo").value = "";
		Me.$("giftNo").focus();
		return false;
	}
};

/**
 * 检测输入号码是否重复
 */
Me.checkSameCouponNo = function(couponNo){
	var couponNoList = null;
	try{couponNoList =ordermgr.accept.compnew._coupon_no_list_; }catch(e){}
	if(couponNoList){
		var len = couponNoList.length;
		var count = 0;
		while(len--){
			var current = couponNoList[len].couponNO;
			if(current.length>0 && current == couponNo){
				count++;
			}
		}
		if(count>0){
			alert("\u53f7\u7801\u5df2\u9009\u7528\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
			Me.$("giftNo").value = "";
			Me.$("giftNo").focus();
			return false;
		}
	}
	return true;
};

Me.setObjReadOnly = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

var cardInit = function(){
	Me.setObjReadOnly("advancedPayment");
	//Me.setObjReadOnly("advancedEffDate");
//	if(Me.$("advancedEffDate")){
//		Me.$("advancedEffDate").disabled = true;
//	}
	if(validMonths){
		Me.$("advancedDays").value = validMonths;
		Me.setObjReadOnly("advancedDays");
	}
};
cardInit();
});
