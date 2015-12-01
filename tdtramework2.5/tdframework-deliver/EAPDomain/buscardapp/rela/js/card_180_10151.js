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
var promotionRentResTypeList = cardInfo.promotionRentResTypeList;//�����������õ������Ӫ����Դ����(��ͨ�ն˺�A�ƻ��ն�)
var ifNotAllResKind = cardInfo.ifNotAllResKind;
var rowIndex = cardInfo.rowIndex;
//var reaPrice = cardInfo.realPrice;//ʵ�ռ�
var subsidyAmount = cardInfo.subsidyAmount;//�������
var realPriceCd = cardInfo.realPriceCd;
var promotionType = cardInfo.promotionType;//������������
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
	//orderaccept.common.dialog.MessageBox.alert({title:"��ʾ��Ϣ",message:"��û��Ȩ���ֶ������ֻ�����!"});
	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	return false;
	}
}

Me.$("deviceNo").oncopy = function(){
	if(inputPermission==0){
	event.srcElement.value="";
	event.srcElement.focus();
	//orderaccept.common.dialog.MessageBox.alert({title:"��ʾ��Ϣ",message:"��û��Ȩ���ֶ������ֻ�����!"});
	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	return false;
	}
}

//����Ƿ������봮���Ȩ��
Me.$("deviceNo").onkeydown = function(){
	if(inputPermission==0){
		if(event.keyCode != 13){
	 	event.srcElement.value="";
	  	event.srcElement.focus();
	  	//orderaccept.common.dialog.MessageBox.alert({title:"��ʾ��Ϣ",message:"��û��Ȩ���ֶ������ֻ�����!"});
	  	alert("\u60a8\u6ca1\u6709\u6743\u9650\u624b\u52a8\u8f93\u5165\u624b\u673a\u4e32\u53f7!");
	  	return false;
		}
	}
}
Me.$("deviceNo").onblur = function(){
	var deviceNo = Me.$("deviceNo").value;
	if(deviceNo == ""){
		//������ն˴���Ϊ��ʱ����֤��ʹ�ô��ż������Ƿ���ڣ�������������
		dojo.forEach(dojo.global.$appContext$.deviceNoList||[],function(oneDeviceNo){
			if(oneDeviceNo.rowIndex == rowIndex){
				oneDeviceNo.deviceNo = "";
			}
		});
		return;
	}
	//ȥ���ն˴������ҿո�
	deviceNo = Me.doTrim(deviceNo);
	
	//���жϴ����Ƿ�ΪA�ƻ��ն˴���
	var para = "deviceNo="+deviceNo;
	var resd = executeRequest("prodOfferSaleAjaxAction","isADeviceNo",para);
	if(resd){
		var resJson = eval('('+ resd +')');
		if(resJson.SPECIAL_FLAG == 1){//����ΪA�ƻ��ն˴���
			//A�ƻ��ն������ж�
			if(promotionType == 1){//���
				para += "&operKind=3";
			}else if(promotionType == 6){//���Ѳ���
				para += "&operKind=4"; 	
			}
			para += "&terminalType=1";
			var resData = executeRequest("prodOfferSaleAjaxAction","doCheckARent",para);
			if(resData){
				var resObj = eval('('+ resData +')');
				var flag = resObj.FLAG;
				if(flag != 1){//���ʧ��
					alert(resObj.MSG);
					return;
				}
			}
		}
	}
	//�жϵ�ǰ������ն˴����Ƿ��Ѿ������
	var IfUse = dojo.some(dojo.global.$appContext$.deviceNoList||[],function(oneDeviceNo){
		return oneDeviceNo.deviceNo == deviceNo && oneDeviceNo.rowIndex != rowIndex;
	});
	if(IfUse){//����Ѿ����ڸ�����ʾ��Ϣ
		alert("\u7ec8\u7aef\u4e32\u53f7\u5728\u540c\u4e00\u7b14\u8ba2\u5355\u4e2d\u5df2\u4f7f\u7528\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165");
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
		return;
	}
	if(mktResCd == 36){//��Դ����Ϊ��ȯ
		if(Me.$("giftNo") && Me.$("giftNo").value){
			var param = "giftNo="+Me.$("giftNo").value+"&deviceNo="+Me.$("deviceNo").value;
			var result = executeRequest("prodOfferSaleAjaxAction","checkIfTerminalCouponBind",param);
			if(result){
				var retObj = eval("("+ result +")");
				if(retObj.FLAG == 0){//���ʧ��
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
			if(mktResCd == 20 || mktResCd == 21){//Ӫ����Դ����Ϊ���
				var isRight = dojo.some(promotionRentResTypeList||[],function(oneRentType){
					return oneRentType == resId;
				});
				if(!resId || !isRight){//��Դ�������������ò�ͬ
					alert("\u83b7\u53d6\u7684\u7ec8\u7aef\u7c7b\u578b\u4e0e\u6240\u9009\u9500\u552e\u54c1\u6307\u5b9a\u7ec8\u7aef\u7c7b\u578b\u4e0d\u7b26\u8bf7\u91cd\u65b0\u8f93\u5165\u8bbe\u5907\u7f16\u53f7");
					Me.$("deviceNo").value = "";
					Me.$("deviceNo").focus();
					return false;
				}
			}
			if(resKindList && resKindList.length>0 && !ifNotAllResKind){//���������Ӫ����Դ�������˾�����ն�����
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
			
			//�ַ�ȷ��-->ȥ���ֻ�������uim��������ͬ��У��
//			if(targetProductFlag && ifNewInstall){//��ǰ�������ö���Ϊ��Ʒ
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
			//ͨ���ն��������̹����豸�ͺ�
			Me.$("moblieSourse").onchange();
			
			//Me.$("newoldStatus").value = jsonResultObj.NEWOLD_STATUS;
			//������Դ���ؾ�����豸�ͺ��趨ҳ��չʾ
			Me.$("resourceKind").value = jsonResultObj.RESOURCE_KIND;
			
			//Ӧ�ռ�
			Me.$("shouldFee").value = jsonResultObj.SUGGEST_PRICE/100;
			//��������ʵ�ռ�,��Ҫ����Ӧ�ռ�-������Ƚ��м���
			var reaPrice = "0";
			if(Me.$("shouldFee").value>0){
				reaPrice = eval(Me.$("shouldFee").value-subsidyAmount);//ʵ�ռ�=Ӧ�ռ�-�������
				if(reaPrice<0){
					reaPrice = "0";
				}
			}
			
			//������Ϣwidget
			var detailWidget = util.DomHelper.getParentWidget(Me.$("deviceNo"),"orderaccept.custom.TooltipDialog");
			//��д����ҳ��ʵ�ռ�ֵ
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
			//���÷�ʽ���û�
			//Me.$("rentType").disabled = true;
			
			//�ն˴����ݴ�
			if(!dojo.global.$appContext$.deviceNoList){//�����ڴ˼��������¶���
				var deviceNoList = [];
				deviceNoList.push({
					"rowIndex" : rowIndex,
					"deviceNo" : deviceNo
				});
				dojo.global.$appContext$.set("deviceNoList",deviceNoList);
			}else{//���ڴ˼���,���ж��ڼ������Ƿ��Ѿ����ڵ�ǰ������ն˴���
				var flag = dojo.some(dojo.global.$appContext$.deviceNoList,function(oneDeviceNo){
					return oneDeviceNo.deviceNo == deviceNo; 
				});
				if(!flag){//�����в����ڵ�ǰ�ն˴���,�򱣴�
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

//ȥ�����ҿո�
Me.doTrim = function(str){
	return /^\s*(.*?)\s*$/.exec(str)[1];
};

//ˢ���豸����
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
