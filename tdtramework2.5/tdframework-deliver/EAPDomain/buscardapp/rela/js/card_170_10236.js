BusCard.define('/buscardapp/rela/js/card_170_10236.js',function(_buscard,cardParam){ 
Me = this;
var cardInfo = arguments[1];
var serviceOfferId = cardInfo.serviceOfferId;
//for compatibility
var executeRequest = _buscard.executeRequest;
//701���� �ж��Ƿ����
var param = "cityCode="+$("cityCodeHidden").value;
var switch701 = executeRequest("prodOfferSaleAjaxAction","ifClearDeviceNo",param);
var constObj = {
	NONE_BIND_SALE_KIND : '0',
	PHONE_ONLY : '1',
	PAY_BY_CASH : '0',
	PAY_BY_SUBSIDY : '1'
};

var list1 = [],list2 = [];
list1.push({id : 0,name : '���'});
list1.push({id : 2,name : '�ۻ�'});
list2.push({id : 1,name : '���'});

//���۷�ʽ  ��ʼֵ
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
		//------------------------------����Դ�ӿ�iri_mobile_kind_check_p �ն��ͺ��ж�  ����[0] �Ƿ�ʡ���ն˱�ʶ  1.ʡ���ն�  0.ʡ���ն� [1] �Ƿ��������ն�    1.�����ն�  0.�������ն�
		
		//------------------------------���ݷ��ؽ�����ж��Ƿ������նˣ������ ����Դ�ӿ�iri_mobile_manage_check_p ���м��
		
		
	var param = "deviceNo="+deviceNo;
	var deviceKind  = executeRequest("saleAcceptAjaxAction","getAMobileKind",param);
	if(deviceKind == ""){
		   alert("��ȡ���ն����ͽӿ��쳣");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		      return false;
		  }
	var OldDeviceNo = $("preDeviceNo").value;
	var paramOld = "deviceNo="+OldDeviceNo;
	var deviceKindOld  = executeRequest("saleAcceptAjaxAction","getAMobileKind",paramOld);
	if(deviceKindOld == ""){
		   alert("��ȡ���ն����ͽӿ��쳣");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		      return false;
		  }
	
	var proviceFlag = deviceKind.split("`")[1];
	  if(deviceKind.split("`")[3] == 0 ){  //0 �����ն�������
	   alert("�ô��벻���ڣ�����������");
		Me.$("deviceNo").value = "";
		Me.$("deviceNo").focus();
	      return false;
	  }
	  if(deviceKind.split("`")[2] == 1){      
		   param = "deviceNo="+deviceNo+"&operKind=1&proviceFlag="+proviceFlag;
		   var checkRest = executeRequest("saleAcceptAjaxAction","getAMobile",param);
		   if(checkRest == ""){
		    alert("A���ն˼��ӿ��쳣");
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

		//�����ն˼��	 
	  param = "deviceNo="+deviceNo+"&operKind="+chkOperKind+"&proviceFlag="+proviceFlag;
			   var checkRest = executeRequest("saleAcceptAjaxAction","getAMobile",param);
			   if(checkRest == ""){
			    alert("�ն˼��ӿ��쳣");
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
	
	//����ֻ������Ƿ����Ч���Ƿ������
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
	
	//����Դ�ӿ� ��ѯ�ֻ����������Ϣ
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
	
	//����ն������Ƿ���ͬ
		if(deviceKind.split("`")[2] == 1 &&  deviceKindOld.split("`")[2] == 0){
			alert("��ͨ�ն˲��ܺ������ն˻���");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		       return false;
		}
		if(deviceKind.split("`")[2] == 0 &&  deviceKindOld.split("`")[2] == 1){
			alert("��ͨ�ն˲��ܺ������ն˻���");
			Me.$("deviceNo").value = "";
			Me.$("deviceNo").focus();
		     return false;
		}
	
	//�������bd_source_dealer_check_p
	if(!SalePhoneCommonService.doSourceDealerCheck(serviceOfferId,jsonResultObj.allId.BELONGS_TO))
		return;
	
	if(jsonResultObj && jsonResultObj.flag && jsonResultObj.flag == "1"){
		if(deviceKind.split("`")[2] == 1 && deviceKindOld.split("`")[2] == 1){
			if(!$("preMobileSource").value.equals( jsonResultObj.allDesc.MOBILE_SOURCE)){
				alert("���ն����ͱ��������ն�������ͬ");
				Me.$("deviceNo").value = "";
				Me.$("deviceNo").focus();
			       return false;
				}
			}
		
		$("moblieSourse").value = jsonResultObj.allDesc.MOBILE_SOURCE||'';
		$("newoldStatus").value = jsonResultObj.allDesc.NEWOLD_STATUS||'';
		$("resourceKind").value = jsonResultObj.allDesc.RESOURCE_KIND||'';
		$("shouldFee").value = jsonResultObj.allId.SUGGEST_PRICE/100;
		//������bug���� ʵ�ռ۸�ͽ���۸񱣳�һ�£�ԭֵ:jsonResultObj.allId.MOBILE_SALE_PRICE/100
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
