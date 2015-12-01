//全局变量
var webpath="";
var QueryFlag = 1;
/**
 * 初始化
 */
function init(){
	webpath = document.all("webpath").value;
	eapObjsMgr.onReady();
	$("serviceId").focus();
}
/**
 * 根据业务号码局部刷新出对应的主产品名称
 */
function getProductIdList(obj){
	if(document.forms[0].queryByServiceId.checked){//按照业务号码查询
		var serviceId = obj.value;
		if(trim(serviceId)!=""){
			getMainProdByServiceId(serviceId,$('productId'));
		}	 	
	}
}
/**
 * 查询
 */
function BQuery_OnClick()
{
	if(QueryFlag==1){
		if( $("serviceId").value == "") {
			// alert("[业务号码]不能为空，请重新输入！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410164"});
			$("serviceId").focus();
			return;
		}
		if( $("productId").value == "") {
			var message = "[业务号码]不存在，请重新输入！";
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08410168",infoList:[message]});
			$("serviceId").focus();
			return;
		}		
	}else if(QueryFlag==2){
		if( $("identityCode").value == "") {
			// alert("[证件号码]不能为空，请重新输入！");
			orderaccept.common.dialog.MessageBox.alert({busiCode:"08510101"}); 
			$("identityCode").focus();
			return;
		}	
	}else if(QueryFlag==3){
		if( $("firstName").value == "") {
			// alert("[客户姓名]不能为空，请重新输入！");
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
 * 重置
 */
function BReset_OnClick(){
	window.open(webpath+"/orderaccept/offerstandardaccept/OfferStandardAcceptMain.jsp",'_parent');
}
/*查询方式改变*/
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
		$('QueryMet').value = "0";// 模糊查询
	}else{
		$('QueryMet').value = "1";// 精确查询
	}
}