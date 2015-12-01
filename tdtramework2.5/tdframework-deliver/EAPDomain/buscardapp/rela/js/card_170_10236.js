BusCard.define('/buscardapp/rela/js/card_170_10236.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
//701开关 判断是否清空
var param = "cityCode="+$("cityCodeHidden").value;
var switch701 = executeRequest("prodOfferSaleAjaxAction","ifClearDeviceNo",param);
var constObj = {
	NONE_BIND_SALE_KIND : '0',
	PHONE_ONLY : '1',
	PAY_BY_CASH : '0',
	PAY_BY_SUBSIDY : '1'
};

var list1 = [],list2 = [];
list1.push({id : 0,name : '租机'});
list1.push({id : 2,name : '售机'});
list2.push({id : 1,name : '裸机'});

//销售方式  初始值
BusCard.$rs(Me.$("saleType"),list2);

/*Me.$("extentInfo").onchange = function(){
	var extentInfo = Me.$("extentInfo").value;
	var param = "extentInfo="+extentInfo;
	var jsonMapStr = executeRequest("businessAcceptAction","getRetailInfo",param);
	var jsonMapObj = Jscu.util.CommUtil.parse(jsonMapStr);
	BusCard.$rs($("retailInfo"),jsonMapObj.retailInfoColl);
};*/


Me.$("deviceNo").onblur = function(){
	var deviceNo = this.value;
	if(deviceNo=='')
		return
		//------------------------------调资源接口iri_mobile_kind_check_p 终端型号判断  返回[0] 是否省内终端标识  1.省内终端  0.省外终端 [1] 是否是特殊终端    1.特殊终端  0.非特殊终端
		
		//------------------------------根据返回结果，判断是否特殊终端，如果是 调资源接口iri_mobile_manage_check_p 进行检测
		
		
	var param = "deviceNo="+deviceNo;
	var deviceKind  = executeRequest("saleAcceptAjaxAction","getAMobileKind",param);
	if(deviceKind == ""){
		   alert("获取新终端类型接口异常");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		      return false;
		  }
	var OldDeviceNo = $("preDeviceNo").value;
	var paramOld = "deviceNo="+OldDeviceNo;
	var deviceKindOld  = executeRequest("saleAcceptAjaxAction","getAMobileKind",paramOld);
	if(deviceKindOld == ""){
		   alert("获取旧终端类型接口异常");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		      return false;
		  }
	
	var proviceFlag = deviceKind.split("`")[1];
	  if(deviceKind.split("`")[3] == 0 ){  //0 代表终端有问题
	   alert("该串码不存在，请重新输入");
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
	      return false;
	  }
	  if(deviceKind.split("`")[2] == 1){      
		   param = "deviceNo="+deviceNo+"&operKind=1&proviceFlag="+proviceFlag;
		   var checkRest = executeRequest("saleAcceptAjaxAction","getAMobile",param);
		   if(checkRest == ""){
		    alert("A类终端检测接口异常");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		       return false;
		   } 
		   if(checkRest.split("`")[1] < 0){
		    alert(checkRest.split("`")[2]);
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		       return false;
		   }  
		  }  
	  
		else if(deviceKind.split("`")[3] == 1 && deviceKind.split("`")[2] == 0){  
			   var chkOperKind = "1";

		//特殊终端检测	 
	  param = "deviceNo="+deviceNo+"&operKind="+chkOperKind+"&proviceFlag="+proviceFlag;
			   var checkRest = executeRequest("saleAcceptAjaxAction","getAMobile",param);
			   if(checkRest == ""){
			    alert("终端检测接口异常");
				Me.$("deviceNo").value = "";
				Me.$("deviceNo").focus();
			       return false;
			   } 
			   if(checkRest.split("`")[1] < 0){
			    alert(checkRest.split("`")[2]);
				Me.$("deviceNo").value = "";
				Me.$("deviceNo").focus();
			       return false;
			   } 
			  }
	
	//检测手机串号是否可有效、是否可销售
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
		if(switch701=='1')
			this.value = "";
		this.focus();
		return false;
	}
	
	//调资源接口 查询手机串号相关信息
	var queryInfoObj = {
		"MOBILE_SALE_PRICE" : "0",
		"SUGGEST_PRICE" : "0",
		"BELONGS_TO" : "0",
		"MOBILE_SOURCE" : "0",
		"NEWOLD_STATUS" : "0",
		"RESOURCE_KIND" : "0",
		"MOBILE_COLOR" : "0",
		"INST_ID" : "0",
		"DESC_BELONGS_TO" : "1",
		"DESC_MOBILE_SOURCE" : "1",
		"DESC_NEWOLD_STATUS" : "1",
		"DESC_RESOURCE_KIND" : "1"
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
	var jsonResultObj =  (typeof resultJsonStr=='string')?eval("("+resultJsonStr+")"):resultJsonStr;
	
	//检测终端类型是否相同
		if(deviceKind.split("`")[2] == 1 &&  deviceKindOld.split("`")[2] == 0){
			alert("普通终端不能和特殊终端互换");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		       return false;
		}
		if(deviceKind.split("`")[2] == 0 &&  deviceKindOld.split("`")[2] == 1){
			alert("普通终端不能和特殊终端互换");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		     return false;
		}
	
	//渠道检测bd_source_dealer_check_p
	if(!SalePhoneCommonService.doSourceDealerCheck(serviceOfferId,jsonResultObj.allId.BELONGS_TO))
		return;
	
	if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
		if(deviceKind.split("`")[2] == 1 && deviceKindOld.split("`")[2] == 1){
			if(!$("preMobileSource").value.equals( jsonResultObj.allDesc.MOBILE_SOURCE)){
				alert("新终端类型必须与新终端类型相同");
				Me.$("deviceNo").value = "";
				Me.$("deviceNo").focus();
			       return false;
				}
			}
		
		$("moblieSourse").value = jsonResultObj.allDesc.MOBILE_SOURCE||'';
		$("newoldStatus").value = jsonResultObj.allDesc.NEWOLD_STATUS||'';
		$("resourceKind").value = jsonResultObj.allDesc.RESOURCE_KIND||'';
		$("shouldFee").value = jsonResultObj.allId.SUGGEST_PRICE/100;
		//测试组bug问题 实收价格和建议价格保持一致，原值:jsonResultObj.allId.MOBILE_SALE_PRICE/100
		$("realFee").value = jsonResultObj.allId.SUGGEST_PRICE/100;
		$("mobileAgent").value = jsonResultObj.allDesc.BELONGS_TO_DESC || '';
		
		$("mobile_Source_Id").value = jsonResultObj.allId.MOBILE_SOURCE||'';
		$("newold_Status_Id").value = jsonResultObj.allId.NEWOLD_STATUS||'';
		$("resource_Kind_Id").value = jsonResultObj.allId.RESOURCE_KIND||'';
		$("device_Color_Id").value = jsonResultObj.allId.MOBILE_COLOR||'';
		$("mkt_Res_Inst_Id").value = jsonResultObj.allId.INST_ID||'';
		$("mobile_Agent_Id").value = jsonResultObj.allId.BELONGS_TO || '';
		$("device_Color_Id").value = jsonResultObj.allId.MOBILE_COLOR || '';
		
	}else{
		if(switch701=='1')
			this.value = "";
		this.focus();
		return false;
	}
	
};

Me.$("realFee").onkeypress = function(){
	return checkInputChar();
};

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
	/* card init */
};

cardInit();
});
