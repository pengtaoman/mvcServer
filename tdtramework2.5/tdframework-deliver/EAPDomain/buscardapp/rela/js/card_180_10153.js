BusCard.define('/buscardapp/rela/js/card_180_10153.js',function(_buscard,cardParam){ 
var Me = this;
var cardInfo = arguments[1];
var coupons = "-1";
var constObj = {
	DEFAULT_SERVICE_OFFER_ID : '2211'
};
//for compatibility
var executeRequest = _buscard.executeRequest;
Me.$("cdeviceNo").onblur = function(){
	var deviceNo = Me.$("cdeviceNo").value;
	coupons = Me.getAllCoupons();
	if(deviceNo == ""){
		return;
	}
	if(coupons == "-"){//判断输入终端串号之前是否已经查询了话费礼券信息
		alert("\u8bf7\u5148\u8f93\u5165\u793c\u5238\u7f16\u53f7\u8fdb\u884c\u67e5\u8be2\uff01");
		if(prodOfferResRelaBuilder){
			var resRelaItemList =  prodOfferResRelaBuilder.resRelaItemList;
			for(var p in resRelaItemList){
				var resRelaInfo = resRelaItemList[p];
				if(resRelaInfo.acceptCardObj.$("giftNo")){
					resRelaInfo.acceptCardObj.$("giftNo").focus();
				}
			}
		}
		return;
	}
	var queryInfoObj = {
		"INST_ID" : "0",
		"MOBILE_SOURCE" : "1",
		"NEWOLD_STATUS" : "1",
		"RESOURCE_KIND" : "1",
		"SUGGEST_PRICE" : "0",
		"BELONGS_TO" : "0",
		"RES_ID" : "0"
	};
	var validInfoObj = {
		"checkSaleMobile" : "1",
		"checkCouponNo" : coupons
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
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getResListInfo",parameter);//资源接口需要相应的修改变化
	var result = "-1";
	try{
		var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
		if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
			var resId = jsonResultObj.RES_ID;
			Me.$("cmktResInstId").value = jsonResultObj.INST_ID;
			Me.$("cmoblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			Me.$("cnewoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			Me.$("cresourceKind").value = jsonResultObj.RESOURCE_KIND;
			//Me.$("cshouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			if(jsonResultObj.BELONGS_TO && jsonResultObj.BELONGS_TO != 'null'){
				Me.$("cmobileAgent").value = jsonResultObj.BELONGS_TO;
			}else{
				Me.$("cmobileAgent").value = "";
			}
			Me.$("cmktResId").value = deviceNo;
		}else{
			alert(jsonResultObj.message);
			Me.$("cdeviceNo").value = "";
			Me.$("cdeviceNo").focus();
			return false;
		}
	}catch(e){
		alert(e);
		Me.$("cdeviceNo").value = "";
		Me.$("cdeviceNo").focus();
		return false;
	}
};

/**
 * 属性设置只读
 */
Me.setObjReadOnly = function(name){
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};

/**
 * 获取所有选择的礼券编号
 */
Me.getAllCoupons = function(){
	var couponStr = "-1";
	var checkedCouponList = null;
	try{checkedCouponList = ordermgr.accept.compnew._coupon_no_list_ ;}catch(e){}
	if(checkedCouponList){
		for(var i=0;i<checkedCouponList.length;i++){
			var couponNo = checkedCouponList[i].couponNO;
			couponStr = "";
			couponStr += (couponNo+"~");
		}
		couponStr = couponStr.substring(0,couponStr.length-1);
	}
	return couponStr;
};

var cardInit = function(){
	Me.setObjReadOnly("cmoblieSourse");
	Me.setObjReadOnly("cnewoldStatus");
	Me.setObjReadOnly("cresourceKind");
	Me.setObjReadOnly("cshouldFee");
	Me.setObjReadOnly("cmobileAgent");
};

cardInit();
});
