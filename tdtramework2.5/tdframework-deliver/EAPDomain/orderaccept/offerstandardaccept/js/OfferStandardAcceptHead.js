//ȫ�ֱ���
var webpath="";
var QueryFlag = 1;
/**
 * ��ʼ��
 */
function init(){
	webpath = document.all("webpath").value;
	eapObjsMgr.onReady();
	$("serviceId").focus();
}
/**
 * ����ҵ�����ֲ�ˢ�³���Ӧ������Ʒ����
 */
function getProductIdList(obj){
	if(document.forms[0].queryByServiceId.checked){//����ҵ������ѯ
		var serviceId = obj.value;
		if(trim(serviceId)!=""){
			getMainProdByServiceId(serviceId,$('productId'));
		}	 	
	}
}
/**
 * ��ѯ
 */
function BQuery_OnClick()
{
	if(QueryFlag==1){
		if( $("serviceId").value == "") {
			// alert("[ҵ�����]����Ϊ�գ����������룡");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410164"});
			$("serviceId").focus();
			return;
		}
		if( $("productId").value == "") {
			var message = "[ҵ�����]�����ڣ����������룡";
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410168",infoList:[message]});
			$("serviceId").focus();
			return;
		}		
	}else if(QueryFlag==2){
		if( $("identityCode").value == "") {
			// alert("[֤������]����Ϊ�գ����������룡");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510101"}); 
			$("identityCode").focus();
			return;
		}	
	}else if(QueryFlag==3){
		if( $("firstName").value == "") {
			// alert("[�ͻ�����]����Ϊ�գ����������룡");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510106"}); 
			$("firstName").focus();
			return;
		}	
	}

	document.forms[0].action=webpath+"/OfferStandardAcceptAction.do?method=getCustomerInfoList";
	document.forms[0].target="Content";
  	document.forms[0].submit();
}
/**
 * ����
 */
function BReset_OnClick(){
	window.open(webpath+"/orderaccept/offerstandardaccept/OfferStandardAcceptMain.jsp",'_parent');
}
/*��ѯ��ʽ�ı�*/
function changeQuery(obj){
	if(obj.value == 1){
		QueryFlag = 1;
		$("trIdentity").style.display = "none";
		$("trServiceId").style.display = "";
		$("trFirstName").style.display = "none";
		$("identityCode").isnullable = "true";
		$("serviceId").isnullable = "false";
		$("firstName").isnullable = "true";
	}
	else if(obj.value == 2){
	  	QueryFlag = 2;
		$("trIdentity").style.display = "";
		$("trServiceId").style.display = "none";
		$("trFirstName").style.display = "none";
		$("identityCode").isnullable = "false";
		$("serviceId").isnullable = "true";
		$("firstName").isnullable = "true";
	}
	else{
		QueryFlag = 3;
		$("trIdentity").style.display = "none";
		$("trServiceId").style.display = "none";
		$("trFirstName").style.display = "";
		$("identityCode").isnullable = "true";
		$("serviceId").isnullable = "true";
		$("firstName").isnullable = "false";
	}
}

function changeQueryMet(){
	if(arguments[0].checked) {
		$('QueryMet').value = "0";// ģ����ѯ
	}else{
		$('QueryMet').value = "1";// ��ȷ��ѯ
	}
}