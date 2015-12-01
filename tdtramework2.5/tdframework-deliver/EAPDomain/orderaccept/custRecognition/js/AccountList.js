var eccn = new ECCN("ec");

function init(){
	eccn.init();
	
	var ifAccountChange = document.getElementById("ifAccountChange");
	var ifPayment = document.getElementById("ifPayment");
	var ifPlan = document.getElementById("ifPlan");
	if(document.getElementById("accountChange")!=null){
		if (!eval(ifAccountChange.value)) {
			document.getElementById("accountChange").disabled="disabled";
		}
	}
	if(document.getElementById("payment")!=null){
		if (!eval(ifPayment.value)) {
			document.getElementById("payment").disabled="disabled";
		}
	}
	if(document.getElementById("plan")!=null){
		if (!eval(ifPlan.value)) {
			document.getElementById("plan").disabled="disabled";
		}
	}
}

/**
 * 展示帐户维护页面
 * @param accId 帐户id
 */
function changeAccountInfo(accId)
{
	var accountParamters = "&accountId="+accId;
	//检测是否OCS用户
	var ocsCheckResult = executeRequest("accountUnitAction","checkIfOCSUser",accountParamters);
	if(ocsCheckResult !='0'){
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08520045",infoList:[ocsCheckResult]});
		return false;
	}
	
	var param = "&selectType=1&accId="+accId;
	var pagePath = document.getElementById("webPath").value + "/ordermgr/accountInfoAction.do?method=doAccountInfoQuery"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var data = {opener:this.window};
	openWinDialog(pagePath, '账户变更', 400, 1000, data, false, null);
	parent.parent.document.getElementById("subForm").target = "accountMgrPage";
	//parent.parent.document.getElementById("subForm").submit();
}

/**
 * 展示帐户详细信息页面
 * @param accId 帐户id
 */
function showAccountInfo(accId)
{
	var param = "&selectType=1&accId="+accId;
	var pagePath = document.getElementById("webPath").value + "/ordermgr/accountInfoQueryAction.do?method=doAccountInfoQuery"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var data = {opener:this.window};
	openWinDialog(pagePath, '账户信息', 400, 1000, data, false, null);
	parent.parent.document.getElementById("subForm").target = "accountInfoPage";
	//parent.parent.document.getElementById("subForm").submit();
}
/**
 * 展示支付方案维护页面
 * @param accId 帐户id
 */
function changeAccountPayMent(accId,custId)
{
	var accountParamters = "&accountId="+accId;
	//检测是否OCS用户
	var ocsCheckResult = executeRequest("accountUnitAction","checkIfOCSUser",accountParamters);
	if(ocsCheckResult !='0'){
		orderaccept.common.dialog.MessageBox.alert({busiCode:"08520045",infoList:[ocsCheckResult]});
		return false;
	}
	var param = "&accountId="+accId+"&custId="+custId;
	
	var pagePath = document.getElementById("webPath").value + "/ordermgr/accountPaymentPlanAction.do?method=getPaymentPlanInfo"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var data = {opener:this.window};
	openWinDialog(pagePath, '支付方案维护', 400, 1000, data, false, null);
	parent.parent.document.getElementById("subForm").target = "accountMgrPage";
	//parent.parent.document.getElementById("subForm").submit();
}


/**
 * 展示优惠计划受理界面
 * @param accId 帐户id
 */
function displayFavourPlan(accId,custId,productId,serviceKind,serviceId)
{
	
	var param = "&accountId="+accId+"&custId="+custId+"&productId="+productId+"&serviceKind="+serviceKind+"&serviceId="+serviceId;
	
    var result = executeRequest("favourPlanAction","doCheckOcs",param);
    if(result==-1){
    	orderaccept.common.dialog.MessageBox.alert({busiCode:"08440002"});
        return false;
    }
    if(result=='true'){
    	alert('账户下存在OCS用户，不能进行账务优惠计划受理!');
        return false;
    }
	var pagePath = document.getElementById("webPath").value + "/ordermgr/favourPlanAction.do?method=init"+param;
	parent.parent.document.getElementById("subForm").action = pagePath;
	var data = {opener:this.window};
	openWinDialog(pagePath, '优惠计划受理', 600, 1000, data, false, null);
	parent.parent.document.getElementById("subForm").target = "FavourPlanMainPage";
	//parent.parent.document.getElementById("subForm").submit();
}


