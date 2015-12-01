BusCard.define('/buscardapp/rela/js/getBookingCDMANumberAndRes.js',function(_buscard,cardParam){ 
try{
var Me = this;
var a = arguments[0];
var b = arguments[1];
//for compatibility
var executeRequest = _buscard.executeRequest;
Me.productId = b.productId;
Me.cityCode = b.cityCode;
Me.serviceOfferId = b.serviceOfferId;
//获取产品大类
var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
var messageBox = dojo.require("orderaccept.common.dialog.MessageBox");
//add by liuzhongwei start 2012523 校验号码归属检测
Me.checkNumberDealerSame=function(){
	var queryInfoObj = {
		"IF_VIRTUAL":"0",
		"BELONGS_TO" : "0"
	};
	var queryJsonInfo = BusCard.util.toJson(queryInfoObj);
	var parameter = "mktResId="+Me.$("serviceId").value;
	parameter += "&serviceOfferId="+Me.serviceOfferId;	
	parameter += "&mktResType=1";
	parameter += "&queryJsonInfo="+queryJsonInfo;
	parameter += "&productId="+Me.productId;
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","getQueryResourceInfo",parameter);
	var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
	if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
		if(jsonResultObj.allId.IF_VIRTUAL!=1){//不为虚号码
			var param = "serviceOfferId="+Me.serviceOfferId+"&resDealer="+jsonResultObj.allId.BELONGS_TO+"&serviceKind="+productInfo.netType;
			var result = executeRequest("goodsSaleAcceptAction","doSourceDealerCheck",param);
			if(!!result){
				//alert(result);
				 messageBox.alert({
	                busiCode : "08410214",
	                infoList : [result]
                 });
				Me.$("serviceId").value="";
				return false;
			}
		}
	}
}

//add by liuzhognwei end 2012523    校验号码归属检测
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
    	var cdmaServiceIdElemList = null; 
    	try{cdmaServiceIdElemList =ordermgr.accept.compnew._cdma_number_elem_list_; }catch(e){}
		var B = {"ServiceIdInterface":new ServiceIdInterface({"$" : function(id) {return Me.$(id)}}),"cdmaServiceIdElemList":cdmaServiceIdElemList};
		var container2 = BusCard.$session.container2;
		var workNo = BusCard.$session.workNo;
		var endpassword = BusCard.$session.PASSWORD;
		var noDept = BusCard.$session.acceptDealer;
		var webPath = container2 + "resource/interfacemanage/selectno/SelectNoMain.jsp?STAFFNO=" + workNo + "&PASSWORD=" + endpassword + "&noDept=" + noDept+ "&cityCode=" + Me.cityCode + "&productId=" + Me.productId + "&sortId=1";
		Me.windowResourceServiceId = window.showModalDialog(webPath, B, "DialogWidth:1024px;DialogHeight:768px;status:no;location:no");
	} else {
		var oServiceId = Me.$("serviceId");
		oServiceId.value = result;
		oServiceId.onblur();
		oServiceId.readOnly = true;
	}
	if(Me.$("serviceId").value!=""){
		if(productInfo.netType==8||productInfo.netType==70){
			Me.checkNumberDealerSame();
		}
	}
	
};
Me.checkResource = function () {
	var E = Me.$("serviceId");
	var A = Me.$("serviceId").value;
	if (!A) {
		return true;
	}
	var C = "serviceId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode;
	var D = executeRequest("prodOfferSaleAjaxAction", "checkResourceDealerInfo", C);
	
	var B = executeAjaxResult(D);
	if (B == false) {
		Me.resetServiceId();
		return;
	}
	
	//提示靓号信息
    B = B.split("&");
	if(B[1]){
		//alert(B[1]);
		if(B[1]!="false") {
			 messageBox.alert({
	             busiCode : "08410215",
	             infoList : [B[1]]
	         });
		 }
	}
	
	Me.$("resInstId").value = B[0];
	if(Me.$("uimId")){
		var parameter = "objectId=" + A + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag=NO_COOP_FLAG";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		if (!resultJson || resultJson.flag <= 0) {
			return;
		}
		if(!!Me.$("ifPreCoop")){
			Me.$("ifPreCoop").value = !!resultJson.OPEN_STATUS?resultJson.OPEN_STATUS:"";
		}
		if(resultJson.NUMBER != "-1"){//预配卡
			if(Me.$("uimId").value == "" || Me.$("uimId").value != resultJson.NUMBER){
				Me.$("uimId").value = resultJson.NUMBER;
			}
		}
	}
	var productInfo=BusCard.$remote('productToServiceDAO').queryById({productId:Me.productId});
	if(productInfo.netType==8||productInfo.netType==70){
		Me.checkNumberDealerSame();
	}		
	if(!!Me.$("uimId") && !!Me.$("uimId").value){
		var parameter = "objectId=" + Me.$("uimId").value + "&serviceOfferId=" + Me.serviceOfferId + "&productId=" + Me.productId + "&cityCode=" + Me.cityCode + "&getCoopFlag=UIM_COOP_FLAG";
		var resultJsonStr = executeRequest("prodOfferSaleAjaxAction", "getCoopNumInfo", parameter);
		var resultJson = dojo.fromJson(resultJsonStr);
		if (!!resultJson || resultJson.flag <= 0) {
			if(resultJson.NUMBER != "-1"){//预配卡
				if(Me.$("serviceId").value == "" || Me.$("serviceId").value != resultJson.NUMBER){								
					MessageBox.confirm({
						message : "UIM\u5361\u53f7\u4e3a\u9884\u914d\u5361\uff0c\u4f46\u4e0e\u5f53\u524d\u4e1a\u52a1\u4e0d\u5339\u914d\uff0c\u662f\u5426\u4fdd\u7559\u9884\u914d\u5173\u7cfb?",
						onComplete : function(){
							return function(value) {
								if (value == true) {
									Me.$("serviceId").value = "";
									!!Me.checkUim?Me.checkUim():null;
								} else {
									Me.$("uimResInstId").value = "";
									Me.$("uimId").value = "";
								}
							}
						}(),
						//关闭右上角的"X"按钮时执行onComplete函数
						iconCloseComplete:false
					}, Me.$("uimId"));
				}
			}
		}
	}
};
Me.resetServiceId = function () {
	Me.$("serviceId").value = "";
};
Me.returnBlank = function () {
	var A = (navigator.appname == "Netscape") ? event.which : event.keyCode;
	if (A != 32) {
		return true;
	} else {
		return false;
	}
};
Me.checkSameServiceId = function(){
    var cdmaServiceIdElemList = null; 
    try{cdmaServiceIdElemList =ordermgr.accept.compnew._cdma_number_elem_list_; }catch(e){}
    var chooseServiceId = Me.$("serviceId").value;
    if(cdmaServiceIdElemList){
        var len = cdmaServiceIdElemList.length;
        var count = 0;
        while(len--){
            var current = cdmaServiceIdElemList[len].service.value;
            if(current.length>0&&chooseServiceId == current){
                count++;
            }
        }
        if(count>1){
            alert("\u8be5\u4e1a\u52a1\u53f7\u7801\u5df2\u9009\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\uff01");
            Me.$("serviceId").value = "";
            Me.$("resInstId").value = "";
        }
    }
};
Me.$("link_serviceId").onclick = function () {
	Me.getChooseNumber();
};

Me.$("serviceId").onblur = function () {
	Me.checkResource();
};

Me.$("serviceId").onkeypress = function () {
	return Me.returnBlank();
}
Me.$("serviceId").onpropertychange = function(){
    Me.checkSameServiceId();
};
BusCard.Namespace.create("ordermgr.accept.compnew");
ordermgr.accept.compnew._cdma_number_elem_list_ = ordermgr.accept.compnew._cdma_number_elem_list_ || [];
var serviceObj = {};
serviceObj.service = Me.$("serviceId");
serviceObj.productId = Me.productId;
ordermgr.accept.compnew._cdma_number_elem_list_ .push(serviceObj);

}catch(e){
alert(e.message);

}


});
