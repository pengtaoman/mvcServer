var APP_PATH = document.getElementsByTagName("contextPath")[0].value;
onload = function(){
	setStepBarDisplay("chooseOffer","fillOrder");
}

/**
 * ִ��ѡ�в���
 */
function doSubmitOffer(){
	if(!isChooseOffer()){
		return false;
	}
	var obj = $("hiddenChooseOffer").value;
	var custHeadGetElement = parent.parent.parent.parent.$ || parent.parent.parent.parent.document.getElementById;
	var custJson = custHeadGetElement("custXml").value; //CustRecognitionHead.jsp ҳ�����	
	var custJsonObj = Jscu.util.CommUtil.parse(custJson);
	var arr = obj.split("#");
	// һ��������
	var parameters = "userId="+arr[1];
	parameters += "&customerId="+custJsonObj.custId;
	parameters += "&serviceId="+arr[3];
	parameters += "&productId="+arr[4];
	parameters += "&cityCode="+$("cityCode").value;
	parameters += "&serviceOfferId="+arr[0];
	var resultJsonStr = executeRequest("secondAcceptAjaxAction", "doCheckOrderValid", parameters);
	var result = executeAjaxResult(resultJsonStr);
	if(result === false){
		return false;
	}
		
	// ���񻥳�����ȴ����
	var params = "serviceId="+arr[3];
	params += "&productId="+arr[4];
	params += "&cityCode="+$("cityCode").value;
	params += "&serviceOfferId="+arr[0];
	var jsonStr = executeRequest("secondAcceptAjaxAction", "doCheckServiceWait", params);
	var resultJson = executeAjaxResult(jsonStr);
	if(resultJson === false){
		return false;
	}
	var preHandleFlag = "0";
	var mutualOrderItemId = "0";
	if(resultJson){
		if(window.confirm("���ڷ��񻥳�����ȴ��������������Ϊ"+resultJson+"���Ƿ������")){
			preHandleFlag = "1";
			mutualOrderItemId = resultJson;
		}else{
			return false;
		}
	}
	var URL = getURL(arr[0]);
	if(!URL){
		return;
	}
	var param = "&serviceOfferId="+arr[0];
	param += "&userId=" + arr[1];
	param += "&actionCd=" + arr[2];
	param += "&serviceId=" + arr[3];
	param += "&productId=" + arr[4];
	param += "&custOrderId=" + arr[5];
	param += "&ifDisplay=" + arr[6];
	param += "&preHandleFlag=" + preHandleFlag;
	param += "&prodOfferInstId=" + document.getElementById("prodOfferInstId").value;
	param += "&mutualOrderItemId=" + mutualOrderItemId;
	param += "&actionName="+arr[7];
	var custIdObj=$("custId");
	if(custIdObj){
		param+="&custId="+custIdObj.value;
	}
	
	param += "&custXml="+document.getElementById("custXml").value;
	
	forwardUrl = "."+URL+param; 
	
	//update by zhanghao Ԥ��¼�������������ת start
	if(arr[0]==320){	
		dojo.require("unieap.global");
		dojo.require("unieap.util.util");
		dojo.require("unieap.dialog.DialogUtil");
		var param320 = "&custId=" + custHeadGetElement("custIdHidden").value;
		param320 += "&strServingStatus=" + custHeadGetElement('statusCd').value;
		param320 += "&varValue=1002";// �޸�
		param320 += "&strCustKind=" + custHeadGetElement('groupFlag').value;
		param320 += "&ifPreOrderBack=1";
		param320 += "&backProdOfferInstId=" + document.getElementById("prodOfferInstId").value;
		param320 += "&backProdOfferId=" + document.getElementById("prodOfferId").value;
		param320 += "&backProductId=" + arr[4];
		param320 += "&backUserId=" + arr[1];		
		
		var pagePath = APP_PATH+ "/ordermgr/custInfoMgrAction.do?method=doCustInfoQuery" + param320;
		var title = 'Ԥ��¼����';
		var height = '400';
		var width = '1000';
		var data = {opener:window};
		var isComplete = new Boolean(false);
		
		var dialog = DialogUtil.showDialog(
		{
			url:pagePath,
			title:title,
			height:height,
			width:width,
			dialogData:data,
			isMax:true,
			iconCloseComplete: isComplete
		});	
		return;
	}
	//update by zhanghao Ԥ��¼�������������ת end
	parent.parent.parent.document.getElementById("subForm").action = forwardUrl;
	var popupWin = parent.$("offerList").contentWindow.window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,,width='
            + (window.screen.width - 20) + ',height='+ (window.screen.height - 100));
	//var popupWin = window.open("about:blank", 'prodOfferSalePage', 'status=1,resizable=1,fullscreen=0,scrollbars=yes,top=10,left=10,width=1000,height=700');
	parent.parent.parent.document.getElementById("subForm").target = "prodOfferSalePage";
	//parent.closeProdPage();
	parent.parent.parent.document.getElementById("subForm").submit();	
	//document.location.href = forwardUrl;
	parent.unieap.hideTooltip();
}

/**
  * У���Ƿ�ѡ�в���
  */
function isChooseOffer(){
	var obj = $("hiddenChooseOffer").value;
	if(obj == ""){
		alert("��ѡ������Ҫ����Ĳ���");
		return false;
	}
	return true;
}

/**
 * ���radiobox�¼�
 */
function changeOffer(objSelf, obj){
	$("hiddenChooseOffer").value = obj;
	if(objSelf && objSelf.childNodes[0]){
		objSelf.childNodes[0].checked = "checked";
	}
}

/**
 * ͨ�������ṩid��ȡҳ��·��
 */
function getURL(serviceofferId){
	var resultJsonStr = executeRequest("secondAcceptAjaxAction", "getURLByServiceOfferId", "serviceofferId="+serviceofferId);
	var result = executeAjaxResult(resultJsonStr);
	if(result === false){
		return false;
	}
	return result;
}

function setStepBarDisplay(divId,passedDivId){
	if(!divId || !passedDivId){
		return;
	}
	if($(divId+"Block") && $(divId+"Txt")){
		$(divId+"Block").className = "step_block_s";
		$(divId+"Txt").className = "step_txt_s";
	}
	if($(passedDivId+"Block") && $(passedDivId+"Txt")){
		$(passedDivId+"Block").className = "step_block_n";
		$(passedDivId+"Txt").className = "step_txt_n";
	}
}

//��ȡ�ύ��
function getParamList(serviceOfferId){
	var paramvalue = "&custXml="+document.getElementById("custXml").value+
				"&flag=1&prodOfferInstId="+document.getElementById("prodOfferInstId").value+
				"&prodOfferId="+document.getElementById("prodOfferId").value+
				"&custOrderId="+parent.parent.parent.parent.document.getElementById("custOrderId").value+ 
				"&prodServiceOfferId=&serviceOfferId="+serviceOfferId;
	return paramvalue;
}