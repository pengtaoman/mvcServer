
/**
 * ���Ӹ�������Ʒ
 */
function changeProdOffer(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");//CustRecognitionHead.jsp ҳ�����
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4003"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initChange"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = 	parent.$("offerList").contentWindow.window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	//var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
	
	
	
	/*$("submitForm").action = $("webPath").value + "/prodOfferSaleAction.do?method=initChange";
	$("submitForm").target = "_self";
	$("submitForm").submit();*/
}
/**
 * �ӱ����ű����ѡ��
 */
function changeProdOfferCRM(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");//CustRecognitionHead.jsp ҳ�����
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4003"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initChangeCRM"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,location=no,menubar=no,toolbar=no,fullscreen=0,scrollbars=yes,top=0,left=0,width='
			                + (window.screen.width-12) + ',height='
			                + (window.screen.height));
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
}
/**
 * ���������Ʒ
 */
function changeProdOfferMain(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4003"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initChangeMain"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
	
	/*$("submitForm").action = $("webPath").value + "/prodOfferSaleAction.do?method=initChangeMain";
	$("submitForm").target = "_self";
	$("submitForm").submit();*/
}

/**
 * �ӱ����ű��������Ʒ
 */
function changeProdOfferMainCRM(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4003"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	//�ж�������Ʒ�Ƿ����Э����������Ʒ
	if(!promotionValid(validArgs)){
		return;
	}
	
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initChangeMainCRM"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,location=no,menubar=no,toolbar=no,fullscreen=0,scrollbars=yes,top=0,left=0,width='
			                + (window.screen.width-12) + ',height='
			                + (window.screen.height));
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
}

function promotionValid(args){
	var parameters = "1=1";
	for (var p in args) {
		parameters += "&" + p + "=" + args[p];
	}
	var resultJsonStr = executeRequest("prodOfferSaleAjaxAction","doCheckPromotionValid",parameters);
	var jsonResultObj = null;
	try{
		jsonResultObj = eval("("+resultJsonStr+")");
	}catch(e){
		//alert(resultJsonStr);
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410056",infoList:[resultJsonStr]});
		return false;
	}
	if(jsonResultObj.code/1 < 0){
		//alert(jsonResultObj.message);
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410057",infoList:[jsonResultObj.message]});
		return false;
	}
	return true;
}

/**
 * ����Ʒ����
 */
function conProdOffer(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4004"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initContinueOrder"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
	
	
	/*$("submitForm").action = $("webPath").value + "/prodOfferSaleAction.do?method=initContinueOrder";
	$("submitForm").target = "_self";
	$("submitForm").submit();*/
}
/**
 * �˶�����Ʒ
 */
function cancelProdOffer(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "4002"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initCancelOffer"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
	
	
	/*$("submitForm").action = $("webPath").value + "/prodOfferSaleAction.do?method=initCancelOffer";
	$("submitForm").target = "_self";
	$("submitForm").submit();*/
}

/**
 * ������Ϣ�޸�
 */
function changeSecurityInfo(){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");
	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : $("prodOfferId").value,
		"prodOfferInstId" : $("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : "97"
	};
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initChangeSecurityInfo"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
}

/**
 * �ײ�ע��
 */
function cancelCombo(serviceOfferId,prodServiceOfferId){
	var customerInfo = eval("("+parent.parent.parent.parent.document.getElementById("custXml").value+")");

	var validArgs = {
		"cityCode" : customerInfo.cityCode,
		"customerId" : customerInfo.custId,
		"prodOfferId" : document.getElementById("prodOfferId").value,
		"prodOfferInstId" : document.getElementById("prodOfferInstId").value,
		"ruleEventId" : $("ruleEventId").value,
		"serviceOfferId" : $("hServiceOfferId").value,
		"actionCD" : serviceOfferId
	};
		
	if(!doOfferAcceptValid(validArgs)){
		return;
	}
	document.getElementById("prodServiceOfferId").value = prodServiceOfferId;
	document.getElementById("serviceOfferId").value = serviceOfferId;

	var param =getParamList();		
	var pagePath = document.getElementById("webPath").value + "/prodOfferSaleAction.do?method=initCancelCombo"+param;
	parent.parent.parent.document.getElementById("subForm").action = pagePath;
	var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	//parent.unieap.hideTooltip();
	parent.unieap._masterTT.domNode.style.display = "none";
	parent.parent.parent.document.getElementById("subForm").submit();
	
	/*
	$('serviceOfferId').value = serviceOfferId;
	$("submitForm").action = $("webPath").value + "/prodOfferSaleAction.do?method=initCancelCombo";
	$("submitForm").target = "_self";
	$("submitForm").submit();*/
}
//��ȡ�ύ��
function getParamList(){
	parent.parent.parent.document.getElementById("custXml").value =parent.parent.parent.parent.document.getElementById("custXml").value;
	 //"&custXml="+document.getElementById("custXml").value+
	var param =	"&flag="+parent.parent.parent.parent.document.getElementById("batchFlag").value+
				"&prodOfferInstId="+document.getElementById("prodOfferInstId").value+
				"&prodOfferId="+document.getElementById("prodOfferId").value+
				"&custOrderId="+parent.parent.parent.parent.document.getElementById("custOrderId").value+ 
				"&prodServiceOfferId="+document.getElementById("prodServiceOfferId").value+
				"&actionName="+document.getElementById("actionName").value+
				"&serviceOfferId="+document.getElementById("serviceOfferId").value;
	return param;
}

/**
  * ԭ�ύ����onChangProdOfferClickΪ���radioʱ��ֱ�Ӵ����ύ����
  * UI���죺���radioʱ��������������ԭ�����е���μ�¼��hidden�У�����ύ��ťdoSubmitServiceOfferʱ����hidden��ȡ��Ӧ��ֵ
  * ע��ԭ��radio�����У�prodServiceOfferIdû���õ���������δ����ԭ�߼���ֱ�ӷŵ�hidden�С�
  */
function doSubmitServiceOffer(){
	var serviceOfferId = $("hServiceOfferId").value;
	var prodServiceOfferId = $("hProdServiceOfferId").value;
	var menuId = $("hMenuId").value;
	if(serviceOfferId == ""){
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08410058"});//"��ѡ������Ҫ����Ĳ���"
		//alert("��ѡ������Ҫ����Ĳ���");
		return;
	}
	if("4003"==serviceOfferId&"841ABA"==menuId){
		//�����ѡ��
		changeProdOfferCRM();
	}else if("4003"==serviceOfferId&"841ABB"==menuId){
		//���������Ʒ
		changeProdOfferMainCRM();
	}else if("4004"==serviceOfferId&"841ABC"==menuId){
		//����Ʒ����
		 conProdOffer();
	}else if("97"==serviceOfferId&"841ABEA"==menuId){
		//������Ϣ�޸�
		 changeSecurityInfo();
	}else if("4003"==serviceOfferId&"841ABC"==menuId){
		//��Ա�������Ʒ
		changeProdOfferCRM();
	}else{
		cancelCombo();
	}
}

/**
  * ԭ�ύ����Ϊ���radioʱ��ֱ�Ӵ����ύ������UI���죺���radioʱ��������������ԭ�����е���μ�¼��hidden�У�����ύ��ťʱ����hidden��ȡ��Ӧ��ֵ
  * ע��ԭ��radio�����У�prodServiceOfferIdû���õ���������δ����ԭ�߼���ֱ�ӷŵ�hidden�С�
  */
function onChangProdOfferClick(actionName,serviceOfferId,prodServiceOfferId,menuId,ruleEventId,objSelf){
	$("hServiceOfferId").value = serviceOfferId;
	$("hProdServiceOfferId").value = prodServiceOfferId;
	$("hMenuId").value = menuId;
	$("ruleEventId").value = ruleEventId;
	$("actionName").value = actionName;
	if(objSelf && objSelf.childNodes[0]){
		objSelf.childNodes[0].checked = "checked";
	}
}
