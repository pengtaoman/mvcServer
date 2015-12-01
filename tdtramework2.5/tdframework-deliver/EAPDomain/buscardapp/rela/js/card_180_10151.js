BusCard.define('/buscardapp/rela/js/card_180_10151.js',function(_buscard,cardParam){ 
Me = this;
var a = arguments[0];
var cardInfo = arguments[1];
var mktResCd = cardInfo.serviceOfferId/-1;
//var productId = cardInfo.productId;
var realFee = cardInfo.realFee || "0";
var mktResName = cardInfo.mktResName;
var resKindList = cardInfo.resKindList;
//var uniqueid = cardInfo.uniqueid;
//var targetProductFlag = cardInfo.targetProductFlag;
//var ifNewInstall = cardInfo.ifNewInstall;
var promotionRentResTypeList = cardInfo.promotionRentResTypeList;//促销政策配置的租机类营销资源类型(普通终端和A计划终端)
var ifNotAllResKind = cardInfo.ifNotAllResKind;
var rowIndex = cardInfo.rowIndex;
//var reaPrice = cardInfo.realPrice;//实收价
var subsidyAmount = cardInfo.subsidyAmount;//补贴额度
var realPriceCd = cardInfo.realPriceCd;
var promotionType = cardInfo.promotionType;//促销政策类型
//for compatibility
var executeRequest = _buscard.executeRequest;
var util = dojo.require("orderaccept.prodofferaccept.util");
var constObj = {
	DEFAULT_SERVICE_OFFER_ID : '2211'
};

var serviceParamBO = a.$remote("serviceParamBO");

var resultJsonString = executeRequest("goodsSaleAcceptAction","SerialNumScan");
var inputPermission = "";
if(resultJsonString){
	var res = eval('('+ resultJsonString+')');
	inputPermission = res.flag;
}

Me.$("deviceNo").onpaste = function(){
	if(inputPermission==0){
	event.srcElement.value="";
	event.srcElement.focus();
	//orderaccept.common.dialog.MessageBox.alert({title:"提示信息",message:"您没有权限手动输入手机串号!"});
	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	return false;
	}
}

Me.$("deviceNo").oncopy = function(){
	if(inputPermission==0){
	event.srcElement.value="";
	event.srcElement.focus();
	//orderaccept.common.dialog.MessageBox.alert({title:"提示信息",message:"您没有权限手动输入手机串号!"});
	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	return false;
	}
}

//检测是否有输入串码的权限
Me.$("deviceNo").onkeydown = function(){
	if(inputPermission==0){
		if(event.keyCode != 13){
	 	event.srcElement.value="";
	  	event.srcElement.focus();
	  	//orderaccept.common.dialog.MessageBox.alert({title:"提示信息",message:"您没有权限手动输入手机串号!"});
	  	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	  	return false;
		}
	}
}
Me.$("deviceNo").onblur = function(){
	var deviceNo = Me.$("deviceNo").value;
	if(deviceNo == ""){
		//输入的终端串号为空时，验证已使用串号集合中是否存在，如果存在则清除
		dojo.forEach(dojo.global.$appContext$.deviceNoList||[],function(oneDeviceNo){
			if(oneDeviceNo.rowIndex == rowIndex){
				oneDeviceNo.deviceNo = "";
			}
		});
		return;
	}
	//去掉终端串号左右空格
	deviceNo = Me.doTrim(deviceNo);
	
	//先判断串号是否为A计划终端串号
	var para = "deviceNo="+deviceNo;
	var resd = executeRequest("prodOfferSaleAjaxAction","isADeviceNo",para);
	if(resd){
		var resJson = eval('('+ resd +')');
		if(resJson.SPECIAL_FLAG == 1){//串号为A计划终端串号
			//A计划终端特殊判断
			if(promotionType == 1){//租机
				para += "&operKind=3";
			}else if(promotionType == 6){//话费补贴
				para += "&operKind=4"; 	
			}
			para += "&terminalType=1";
			var resData = executeRequest("prodOfferSaleAjaxAction","doCheckARent",para);
			if(resData){
				var resObj = eval('('+ resData +')');
				var flag = resObj.FLAG;
				if(flag != 1){//检测失败
					alert(resObj.MSG);
					return;
				}
			}
		}
	}
	//判断当前输入的终端串号是否已经输入过
	var IfUse = dojo.some(dojo.global.$appContext$.deviceNoList||[],function(oneDeviceNo){
		return oneDeviceNo.deviceNo == deviceNo && oneDeviceNo.rowIndex != rowIndex;
	});
	if(IfUse){//如果已经存在给出提示信息
		alert("\u7ec8\u7aef\u4e32\u53f7\u5728\u540c\u4e00\u7b14\u8ba2\u5355\u4e2d\u5df2\u4f7f\u7528\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return;
	}
	if(mktResCd == 36){//资源类型为礼券
		if(Me.$("giftNo") && Me.$("giftNo").value){
			var param = "giftNo="+Me.$("giftNo").value+"&deviceNo="+Me.$("deviceNo").value;
			var result = executeRequest("prodOfferSaleAjaxAction","checkIfTerminalCouponBind",param);
			if(result){
				var retObj = eval("("+ result +")");
				if(retObj.FLAG == 0){//检测失败
					alert("\u8f93\u5165\u7ec8\u7aef\u4e32\u53f7\u4e0e\u793c\u5238\u7f16\u53f7\u6ca1\u6709\u7ed1\u5b9a\u5173\u7cfb\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
					Me.$("deviceNo").value = "";
					Me.$("deviceNo").focus();
					return;
				}
			}
		}
	}
	
	var queryInfoObj = {
		"INST_ID" : "0",
		"MOBILE_SOURCE" : "0",
		"NEWOLD_STATUS" : "1",
		"RESOURCE_KIND" : "0",
		"SUGGEST_PRICE" : "0",
		"BELONGS_TO" : "0",
		"RES_ID" : "0",
		"MOBILE_COLOR" : "0",
		"COST_PRICE" : "0"
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
			var resId = jsonResultObj.RES_ID;
			if(mktResCd == 20 || mktResCd == 21){//营销资源类型为租机
				var isRight = dojo.some(promotionRentResTypeList||[],function(oneRentType){
					return oneRentType == resId;
				});
				if(!resId || !isRight){//资源返回类型与配置不同
					alert("\u83b7\u53d6\u7684\u7ec8\u7aef\u7c7b\u578b\u4e0e\u6240\u9009\u9500\u552e\u54c1\u6307\u5b9a\u7ec8\u7aef\u7c7b\u578b\u4e0d\u7b26\u8bf7\u91cd\u65b0\u8f93\u5165\u8bbe\u5907\u7f16\u53f7");
					Me.$("deviceNo").value = "";
					Me.$("deviceNo").focus();
					return false;
				}
			}
			if(resKindList && resKindList.length>0 && !ifNotAllResKind){//所有租机类营销资源都配置了具体的终端类型
				var isRightResKind = dojo.some(resKindList||[],function(oneResKind){
					return jsonResultObj.RESOURCE_KIND == oneResKind.resourceKind;
				});
				if(!isRightResKind){
					alert("\u5177\u4f53\u7ec8\u7aef\u578b\u53f7\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9");
					Me.$("deviceNo").value = "";
					Me.$("deviceNo").focus();
					return false;
				}
			}
			
			//局方确认-->去掉手机串号与uim卡归属相同的校验
//			if(targetProductFlag && ifNewInstall){//当前促销作用对象为产品
//				var uimBelongsTO = $ac$.get("belongsTO_"+uniqueid);
//				if(!uimBelongsTO){
//					alert("\u8bf7\u5148\u586b\u5199\u4f5c\u7528\u4ea7\u54c1\u7684uim\u5361\u4fe1\u606f");
//					Me.$("deviceNo").value = "";
//					Me.$("deviceNo").focus();
//					return false;
//				}
//				if(jsonResultObj.BELONGS_TO != uimBelongsTO){
//					alert("\u7ec8\u7aef\u4e32\u53f7\u5f52\u5c5e\u90e8\u95e8\u4e0euim\u5361\u5f52\u5c5e\u90e8\u95e8\u4e0d\u540c");
//					Me.$("deviceNo").value = "";
//					Me.$("deviceNo").focus();
//					return false;
//				}
//			}
			Me.$("mktResInstId").value = jsonResultObj.INST_ID;
			Me.$("moblieSourse").value = jsonResultObj.MOBILE_SOURCE;
			//通过终端生产厂商过滤设备型号
			Me.$("moblieSourse").onchange();
			
			//Me.$("newoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			//根据资源返回具体的设备型号设定页面展示
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			
			//应收价
			Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			//辽宁处理实收价,需要根据应收价-补贴额度进行计算
			var reaPrice = "0";
			if(Me.$("shouldFee").value>0){
				reaPrice = eval(Me.$("shouldFee").value-subsidyAmount);//实收价=应收价-补贴额度
				if(reaPrice<0){
					reaPrice = "0";
				}
			}
			
			//服务信息widget
			var detailWidget = util.DomHelper.getParentWidget(Me.$("deviceNo"),"orderaccept.custom.TooltipDialog");
			//回写属性页面实收价值
			if(detailWidget && detailWidget.promotionItemsCard.busCardInstance.$(realPriceCd)){
				detailWidget.promotionItemsCard.busCardInstance.$(realPriceCd).value = reaPrice;
			}
			Me.$("realFee").value = reaPrice;
			
			if(jsonResultObj.BELONGS_TO && jsonResultObj.BELONGS_TO != 'null'){
				Me.$("mobileAgent").value = jsonResultObj.BELONGS_TO;
			}else{
				Me.$("mobileAgent").value = "";
			}
			Me.$("mktResId").value = deviceNo;
			//Me.$("resourceColour").value = jsonResultObj.MOBILE_COLOR;
			//Me.$("costFee").value = jsonResultObj.COST_PRICE/100;
			/*
			if($("880") && $("851")){
				var shouldFee = Me.$("shouldFee").value;
				var newFee = $("880").value;
				if(!shouldFee){
					shouldFee = 0;
				}
				if(!newFee){
					newFee = 0;
				}
				var realFee = shouldFee - newFee;
				if(realFee < 0){
					realFee = 0;
				}
				$("851").value = realFee;
			}
			**/
			Me.$("moblieSourse").disabled = true;
			Me.$("resourceKind").disabled = true;
			//租用方式不置灰
			//Me.$("rentType").disabled = true;
			
			//终端串号暂存
			if(!dojo.global.$appContext$.deviceNoList){//不存在此集合则重新定义
				var deviceNoList = [];
				deviceNoList.push({
					"rowIndex" : rowIndex,
					"deviceNo" : deviceNo
				});
				dojo.global.$appContext$.set("deviceNoList",deviceNoList);
			}else{//存在此集合,则判断在集合中是否已经存在当前输入的终端串号
				var flag = dojo.some(dojo.global.$appContext$.deviceNoList,function(oneDeviceNo){
					return oneDeviceNo.deviceNo == deviceNo; 
				});
				if(!flag){//集合中不存在当前终端串号,则保存
					dojo.global.$appContext$.deviceNoList.push({
						"rowIndex" : rowIndex,
						"deviceNo" : deviceNo
					});
				}
			}
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

//去掉左右空格
Me.doTrim = function(str){
	return /^\s*(.*?)\s*$/.exec(str)[1];
};

//刷新设备类型
var refleshResourceKind = function(moblieSourse){
	 var cdata = serviceParamBO.getResourceKind(moblieSourse);
	 if (cdata && cdata.list)a.$rs(Me.$('resourceKind'), cdata.list);
}

if(Me.$("moblieSourse")){
	Me.$("moblieSourse").onchange = function(){
		refleshResourceKind(this.value);
	}
}

/*
Me.$("realFee").onkeypress = function(){
	return checkInputChar();
};
**/

var checkInputChar = function(){
	if(!(event.keyCode>=47&&event.keyCode<=57)){
		return false;
	}
	return true;
}

Me.setObjReadOnly = function (name) {
	if(name && Me.$(name) && Me.$(name).type == "text"){
		Me.$(name).readOnly = true;
	}
	return;
};


var cardInit = function(){
	/* set obj readOnly */
	Me.setObjReadOnly("moblieSourse");
	Me.setObjReadOnly("newoldStatus");
	Me.setObjReadOnly("resourceKind");
	Me.setObjReadOnly("shouldFee");
	Me.setObjReadOnly("mobileAgent");
	//Me.setObjReadOnly("realFee");
	/* card init */
	//Me.$("realFee").value = realFee;
};

cardInit();
});
